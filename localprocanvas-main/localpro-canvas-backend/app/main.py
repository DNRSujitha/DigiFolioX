from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uuid
from typing import List
import asyncio
from datetime import datetime

from .database import db
from .models import User, Portfolio, PortfolioData, ContactDetails, Token, UserRole
from .schemas import (
    UserCreate, UserLogin, UserResponse, 
    PortfolioCreate, PortfolioResponse, PortfolioPublicResponse,
    PortfolioUpdate, SuccessResponse
)
from .auth import (
    authenticate_user, create_access_token, 
    get_current_active_user, get_password_hash,
    generate_unique_identifier
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for startup and shutdown"""
    # Startup
    print("Starting Portfolio Backend API...")
    app.state.db_connected = False
    try:
        await db.connect_to_mongo()
        app.state.db_connected = True
    except Exception as exc:
        print(f"MongoDB unavailable at startup: {exc}")
    yield
    # Shutdown
    print("Shutting down...")
    await db.close_mongo_connection()

# Create FastAPI app
app = FastAPI(
    title="LocalPro Canvas API",
    description="Backend API for Portfolio Generator",
    version="1.0.0",
    lifespan=lifespan
)

def _normalize_portfolio_doc(portfolio: dict) -> dict:
    """Normalize Mongo portfolio documents for response models."""
    created_at = portfolio.get("created_at") or datetime.utcnow()
    updated_at = portfolio.get("updated_at") or created_at
    return {
        **portfolio,
        "id": str(portfolio["_id"]),
        "user_id": str(portfolio["user_id"]),
        "created_at": created_at,
        "updated_at": updated_at,
    }

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "https://localprocanvas-six.vercel.app"],  # React/Vite dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "LocalPro Canvas API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    try:
        if not db.client:
            return {
                "status": "unhealthy",
                "database": "disconnected"
            }
        # Test database connection
        await db.client.admin.command('ping')
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

# User endpoints
@app.post("/register", response_model=SuccessResponse, tags=["Users"])
async def register_user(user_data: UserCreate):
    """
    Register a new user
    """
    try:
        # Check if user already exists
        existing_user = await db.db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Check username if provided
        if user_data.username:
            existing_username = await db.db.users.find_one({"username": user_data.username})
            if existing_username:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )
        
        # Create user document
        user_dict = user_data.dict(exclude_none=True)
        user_dict["hashed_password"] = get_password_hash(user_data.password)
        user_dict.pop("password")  # Remove plain password
        
        # Insert user
        result = await db.db.users.insert_one(user_dict)
        
        # Return success response
        return SuccessResponse(
            message="User registered successfully",
            data={"user_id": str(result.inserted_id)}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )

@app.post("/login", response_model=Token, tags=["Users"])
async def login_user(user_data: UserLogin):
    """
    Login user and return JWT token
    """
    try:
        user = await authenticate_user(user_data.email, user_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        access_token = create_access_token(
            data={"sub": user.email, "user_id": str(user.id)}
        )
        
        return Token(
            access_token=access_token,
            token_type="bearer",
            user_id=str(user.id)
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )

@app.get("/users/me", response_model=UserResponse, tags=["Users"])
async def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    """
    Get current user information
    """
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        username=current_user.username,
        full_name=current_user.full_name,
        is_active=current_user.is_active,
        is_verified=current_user.is_verified,
        role=current_user.role,
        portfolios=current_user.portfolios,
        created_at=current_user.created_at
    )

# Portfolio endpoints
@app.post("/portfolios", response_model=SuccessResponse, tags=["Portfolios"])
async def create_portfolio(
    portfolio_data: PortfolioCreate,
    current_user: User = Depends(get_current_active_user)
):
    """
    Create a new portfolio
    """
    try:
        # Validate portfolio data
        try:
            portfolio_data_validated = PortfolioData(**portfolio_data.data)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid portfolio data: {str(e)}"
            )
        
        # Generate unique identifier
        unique_id = generate_unique_identifier(
            portfolio_data_validated.name,
            str(current_user.id)
        )
        
        # Create portfolio document
        portfolio_dict = {
            "unique_identifier": unique_id,
            "user_id": current_user.id,
            "template": portfolio_data.template,
            "data": portfolio_data_validated.dict(),
            "is_published": False,
            "views": 0,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        
        # Insert portfolio
        result = await db.db.portfolios.insert_one(portfolio_dict)
        
        # Update user's portfolio list
        await db.db.users.update_one(
            {"_id": current_user.id},
            {"$push": {"portfolios": unique_id}}
        )
        
        # Return success response with unique identifier
        return SuccessResponse(
            message="Portfolio created successfully",
            data={
                "portfolio_id": str(result.inserted_id),
                "unique_identifier": unique_id,
                "url": f"/{portfolio_data.template}/{unique_id}"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create portfolio: {str(e)}"
        )

@app.get("/portfolios", response_model=List[PortfolioResponse], tags=["Portfolios"])
async def get_user_portfolios(current_user: User = Depends(get_current_active_user)):
    """
    Get all portfolios for current user
    """
    try:
        portfolios = []
        async for portfolio in db.db.portfolios.find({"user_id": current_user.id}):
            portfolios.append(PortfolioResponse(**_normalize_portfolio_doc(portfolio)))
        
        return portfolios
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch portfolios: {str(e)}"
        )

@app.get("/portfolios/{unique_identifier}", response_model=PortfolioResponse, tags=["Portfolios"])
async def get_portfolio_by_identifier(
    unique_identifier: str,
    current_user: User = Depends(get_current_active_user)
):
    """
    Get portfolio by unique identifier (for owner)
    """
    try:
        portfolio = await db.db.portfolios.find_one({
            "unique_identifier": unique_identifier,
            "user_id": current_user.id
        })
        
        if not portfolio:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Portfolio not found or access denied"
            )
        
        return PortfolioResponse(**_normalize_portfolio_doc(portfolio))
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch portfolio: {str(e)}"
        )

@app.get("/p/{unique_identifier}", response_model=PortfolioPublicResponse, tags=["Portfolios"])
async def get_public_portfolio(unique_identifier: str):
    """
    Get public portfolio by unique identifier (no auth required)
    """
    try:
        portfolio = await db.db.portfolios.find_one({
            "unique_identifier": unique_identifier,
            "is_published": True
        })
        
        if not portfolio:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Portfolio not found or not published"
            )
        
        # Increment view count
        await db.db.portfolios.update_one(
            {"_id": portfolio["_id"]},
            {"$inc": {"views": 1}}
        )
        
        normalized = _normalize_portfolio_doc(portfolio)
        
        return PortfolioPublicResponse(
            unique_identifier=normalized["unique_identifier"],
            template=normalized["template"],
            data=normalized["data"],
            is_published=normalized["is_published"],
            views=normalized["views"] + 1,  # +1 for this view
            created_at=normalized["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch portfolio: {str(e)}"
        )

@app.put("/portfolios/{unique_identifier}", response_model=SuccessResponse, tags=["Portfolios"])
async def update_portfolio(
    unique_identifier: str,
    update_data: PortfolioUpdate,
    current_user: User = Depends(get_current_active_user)
):
    """
    Update portfolio
    """
    try:
        # Find portfolio
        portfolio = await db.db.portfolios.find_one({
            "unique_identifier": unique_identifier,
            "user_id": current_user.id
        })
        
        if not portfolio:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Portfolio not found or access denied"
            )
        
        # Prepare update data
        update_dict = {"updated_at": datetime.utcnow()}
        if update_data.data is not None:
            # Validate data if provided
            try:
                portfolio_data_validated = PortfolioData(**update_data.data)
                update_dict["data"] = portfolio_data_validated.dict()
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid portfolio data: {str(e)}"
                )
        
        if update_data.is_published is not None:
            update_dict["is_published"] = update_data.is_published
        
        # Update portfolio
        await db.db.portfolios.update_one(
            {"_id": portfolio["_id"]},
            {"$set": update_dict}
        )
        
        return SuccessResponse(
            message="Portfolio updated successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update portfolio: {str(e)}"
        )

@app.delete("/portfolios/{unique_identifier}", response_model=SuccessResponse, tags=["Portfolios"])
async def delete_portfolio(
    unique_identifier: str,
    current_user: User = Depends(get_current_active_user)
):
    """
    Delete portfolio
    """
    try:
        # Find and delete portfolio
        result = await db.db.portfolios.delete_one({
            "unique_identifier": unique_identifier,
            "user_id": current_user.id
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Portfolio not found or access denied"
            )
        
        # Remove from user's portfolio list
        await db.db.users.update_one(
            {"_id": current_user.id},
            {"$pull": {"portfolios": unique_identifier}}
        )
        
        return SuccessResponse(
            message="Portfolio deleted successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete portfolio: {str(e)}"
        )

# Admin endpoints
@app.get("/admin/users", response_model=List[UserResponse], tags=["Admin"])
async def get_all_users(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get all users (admin only)
    """
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    try:
        users = []
        async for user in db.db.users.find():
            user["id"] = str(user["_id"])
            users.append(UserResponse(**user))
        
        return users
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch users: {str(e)}"
        )

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail,
            "data": None
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "message": "Internal server error",
            "data": None
        }
    )

# Token expiration
# status.access_token_expires = timedelta(minutes=30)
