from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
from datetime import datetime

# User schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: Optional[str] = None
    full_name: Optional[str] = None
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(char.isdigit() for char in v):
            raise ValueError('Password must contain at least one number')
        if not any(char.isupper() for char in v):
            raise ValueError('Password must contain at least one uppercase letter')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    username: Optional[str]
    full_name: Optional[str]
    is_active: bool
    is_verified: bool
    role: str
    portfolios: List[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Portfolio schemas
class PortfolioCreate(BaseModel):
    template: str
    data: dict  # Will be validated by PortfolioData model
    
    @validator('template')
    def validate_template(cls, v):
        valid_templates = ['modern', 'old-aesthetic']
        if v not in valid_templates:
            raise ValueError(f'Template must be one of: {", ".join(valid_templates)}')
        return v

class PortfolioUpdate(BaseModel):
    data: Optional[dict] = None
    is_published: Optional[bool] = None

class PortfolioResponse(BaseModel):
    id: str
    unique_identifier: str
    user_id: str
    template: str
    data: dict
    is_published: bool
    views: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class PortfolioPublicResponse(BaseModel):
    unique_identifier: str
    template: str
    data: dict
    is_published: bool
    views: int
    created_at: datetime

# Success response
class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[dict] = None