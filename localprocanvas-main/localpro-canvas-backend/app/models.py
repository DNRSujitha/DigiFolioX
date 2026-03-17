from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr, Field, validator
from enum import Enum

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"
    PREMIUM = "premium"

class ContactDetails(BaseModel):
    email: EmailStr
    mobile: str
    
    @validator('mobile')
    def validate_mobile(cls, v):
        # Simple validation for mobile number
        if not v.replace('+', '').replace(' ', '').replace('-', '').isdigit():
            raise ValueError('Mobile number must contain only digits and valid characters')
        return v

class PortfolioData(BaseModel):
    name: str
    skills: List[str]
    hobbies: List[str]
    about: str
    contactDetails: ContactDetails
    template_selected: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class User(BaseModel):
    id: Optional[Any] = Field(alias="_id", default=None)
    email: EmailStr
    username: Optional[str] = None
    full_name: Optional[str] = None
    hashed_password: str
    is_active: bool = True
    is_verified: bool = False
    role: UserRole = UserRole.USER
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    portfolios: List[str] = []  # List of portfolio unique_identifiers
    
    class Config:
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "email": "john@example.com",
                "username": "johndoe",
                "full_name": "John Doe",
                "role": "user"
            }
        }

class Portfolio(BaseModel):
    id: Optional[Any] = Field(alias="_id", default=None)
    unique_identifier: str  # Unique URL identifier
    user_id: Any
    template: str
    data: PortfolioData
    is_published: bool = False
    views: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        arbitrary_types_allowed = True

# Request/Response models
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[str] = None
