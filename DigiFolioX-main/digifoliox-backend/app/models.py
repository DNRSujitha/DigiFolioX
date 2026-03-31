from datetime import datetime
from typing import Optional, List, Any, Dict
from pydantic import BaseModel, EmailStr, Field, validator
from enum import Enum
import re
from datetime import datetime as dt

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"
    PREMIUM = "premium"

# ========== VALIDATION HELPER FUNCTIONS ==========

def validate_gibberish(text: str) -> bool:
    """Check if text contains gibberish patterns"""
    if not text:
        return False
    
    # Check for 5+ consecutive consonants (gibberish)
    if re.search(r'[bcdfghjklmnpqrstvwxyz]{5,}', text.lower()):
        return True
    
    # Check for repeated letters (like "yyyy" or "uuuu")
    if re.search(r'([a-z])\1{4,}', text.lower()):
        return True
    
    return False

def has_meaningful_words(text: str, min_words: int = 3, min_word_length: int = 3) -> bool:
    """Check if text has meaningful words"""
    words = [w for w in text.split() if len(w) >= min_word_length]
    return len(words) >= min_words

# ========== MODELS ==========

class ContactDetails(BaseModel):
    email: EmailStr
    mobile: str
    
    @validator('mobile')
    def validate_mobile(cls, v):
        # Remove common formatting characters
        cleaned = v.replace('+', '').replace(' ', '').replace('-', '').replace('(', '').replace(')', '')
        if not cleaned.isdigit():
            raise ValueError('Mobile number must contain only digits and valid characters (+, -, spaces)')
        if len(cleaned) < 10:
            raise ValueError('Mobile number must be at least 10 digits')
        if len(cleaned) > 15:
            raise ValueError('Mobile number is too long (max 15 digits)')
        return v

class Skill(BaseModel):
    name: str
    level: Optional[str] = 'Beginner'
    
    @validator('name')
    def validate_skill_name(cls, v):
        if not v or len(v.strip()) < 1:
            raise ValueError('Skill name cannot be empty')
        if len(v) > 30:
            raise ValueError('Skill name is too long (max 30 characters)')
        
        # Allow letters, numbers, spaces, hyphens, dots, plus signs, parentheses, hash
        if not re.match(r'^[a-zA-Z0-9\s\-.#+()]+$', v):
            raise ValueError('Use only letters, numbers, spaces, hyphens, dots, plus signs, or parentheses')
        
        # Check for gibberish
        if validate_gibberish(v):
            raise ValueError('Skill name contains random letters. Please enter a valid skill (e.g., JavaScript, Python, React)')
        
        return v.strip()
    
    @validator('level')
    def validate_level(cls, v):
        valid_levels = ['Beginner', 'Intermediate', 'Expert']
        if v and v not in valid_levels:
            raise ValueError(f'Level must be one of: {", ".join(valid_levels)}')
        return v

class Project(BaseModel):
    title: str
    description: Optional[str] = ""
    
    @validator('title')
    def validate_project_title(cls, v):
        if not v or len(v.strip()) < 1:
            raise ValueError('Project title cannot be empty')
        if len(v) > 100:
            raise ValueError('Project title is too long (max 100 characters)')
        return v.strip()
    
    @validator('description')
    def validate_project_description(cls, v):
        if v and len(v) > 500:
            raise ValueError('Project description is too long (max 500 characters)')
        return v

class Education(BaseModel):
    degree: str
    institution: str
    year: Optional[str] = None
    
    @validator('degree')
    def validate_degree(cls, v):
        if not v or len(v.strip()) < 2:
            raise ValueError('Degree name must be at least 2 characters')
        if len(v) > 100:
            raise ValueError('Degree name is too long (max 100 characters)')
        return v.strip()
    
    @validator('institution')
    def validate_institution(cls, v):
        if not v or len(v.strip()) < 2:
            raise ValueError('Institution name must be at least 2 characters')
        if len(v) > 100:
            raise ValueError('Institution name is too long (max 100 characters)')
        return v.strip()
    
    @validator('year')
    def validate_year(cls, v):
        if v and v.strip():
            if not re.match(r'^\d{4}$', v.strip()):
                raise ValueError('Year must be a 4-digit number (e.g., 2020, 2024)')
            year_num = int(v.strip())
            current_year = dt.now().year
            if year_num < 1900 or year_num > current_year + 5:
                raise ValueError(f'Year must be between 1900 and {current_year + 5}')
        return v

class Experience(BaseModel):
    role: str
    company: str
    duration: Optional[str] = None
    
    @validator('role')
    def validate_role(cls, v):
        if not v or len(v.strip()) < 2:
            raise ValueError('Role must be at least 2 characters')
        if len(v) > 100:
            raise ValueError('Role is too long (max 100 characters)')
        return v.strip()
    
    @validator('company')
    def validate_company(cls, v):
        if not v or len(v.strip()) < 2:
            raise ValueError('Company name must be at least 2 characters')
        if len(v) > 100:
            raise ValueError('Company name is too long (max 100 characters)')
        return v.strip()
    
    @validator('duration')
    def validate_duration(cls, v):
        if v and v.strip():
            trimmed = v.strip()
            
            # Valid formats
            patterns = [
                r'^\d{4}-(?:Present|present|\d{4})$',  # 2020-Present or 2020-2024
                r'^[A-Za-z]{3}\s\d{4}\s-\s(?:Present|present|[A-Za-z]{3}\s\d{4})$',  # Jan 2020 - Present
                r'^\d+\s+months?$',  # 6 months
                r'^\d+(?:\.\d+)?\s+years?$',  # 3 years, 2.5 years
                r'^\d+[my]$',  # 6m, 12m, 2y
                r'^\d{4}$',  # Single year
                r'^\d+\s*-\s*\d+\s+months?$',  # 6-12 months
            ]
            
            is_valid = any(re.match(pattern, trimmed, re.IGNORECASE) for pattern in patterns)
            if not is_valid:
                raise ValueError("Use format: '2022-Present', '2020-2024', '6 months', '3 years', or 'Jan 2020 - Present'")
        return v

class ProfessionMetadata(BaseModel):
    label: str
    description: str
    
    @validator('label')
    def validate_label(cls, v):
        if not v or len(v.strip()) < 2:
            raise ValueError('Label must be at least 2 characters')
        return v.strip()
    
    @validator('description')
    def validate_description(cls, v):
        if not v or len(v.strip()) < 5:
            raise ValueError('Description must be at least 5 characters')
        return v.strip()

class PortfolioData(BaseModel):
    name: str
    profession: Optional[str] = None
    skills: List[Skill] = []
    hobbies: List[str] = []
    projects: List[Project] = []
    certifications: List[str] = []
    about: str
    education: List[Education] = []
    experience: List[Experience] = []
    contactDetails: ContactDetails
    professionalLinks: Optional[Dict[str, str]] = {}
    profession_metadata: Optional[ProfessionMetadata] = None
    template_selected: str
    
    @validator('name')
    def validate_name(cls, v):
        if not v or len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters')
        if len(v) > 100:
            raise ValueError('Name is too long (max 100 characters)')
        if not re.match(r'^[a-zA-Z\s\.\-]+$', v):
            raise ValueError('Name can only contain letters, spaces, dots, and hyphens')
        return v.strip()
    
    @validator('profession')
    def validate_profession(cls, v):
        if v:
            valid_professions = ['Photographer', 'Designer', 'Developer', 'Writer', 'Consultant', 
                                 'Coach', 'Artist', 'Therapist', 'Chef', 'Fitness Trainer']
            if v not in valid_professions:
                raise ValueError(f'Profession must be one of: {", ".join(valid_professions)}')
        return v
    
    @validator('about')
    def validate_about(cls, v):
        if not v or len(v.strip()) < 20:
            raise ValueError('About section must be at least 20 characters')
        if len(v) > 2000:
            raise ValueError('About section is too long (max 2000 characters)')
        
        # Check for gibberish
        if validate_gibberish(v):
            raise ValueError('Content contains random letters. Please write meaningful content')
        
        # Check if it has meaningful words
        if not has_meaningful_words(v, min_words=3, min_word_length=3):
            raise ValueError('Please add more meaningful content (at least 3 words with 3+ letters each)')
        
        return v.strip()
    
    @validator('hobbies')
    def validate_hobbies(cls, v):
        for hobby in v:
            if not hobby or len(hobby.strip()) < 2:
                raise ValueError('Hobby name must be at least 2 characters')
            if len(hobby) > 40:
                raise ValueError(f'Hobby "{hobby}" is too long (max 40 characters)')
            
            if validate_gibberish(hobby):
                raise ValueError(f'Hobby "{hobby}" contains random letters. Please enter a valid hobby')
            
            if not re.match(r'^[a-zA-Z\s\-&]+$', hobby):
                raise ValueError(f'Hobby "{hobby}" can only contain letters, spaces, hyphens, and ampersands')
        return v
    
    @validator('certifications')
    def validate_certifications(cls, v):
        for cert in v:
            if not cert or len(cert.strip()) < 3:
                raise ValueError('Certification name must be at least 3 characters')
            if len(cert) > 60:
                raise ValueError(f'Certification "{cert}" is too long (max 60 characters)')
            
            if validate_gibberish(cert):
                raise ValueError(f'Certification "{cert}" contains random letters. Please enter a valid certification')
        return v
    
    @validator('professionalLinks')
    def validate_links(cls, v):
        if v:
            url_pattern = re.compile(
                r'^https?://'  # http:// or https://
                r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
                r'localhost|'  # localhost...
                r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
                r'(?::\d+)?'  # optional port
                r'(?:/?|[/?]\S+)?$', re.IGNORECASE)
            
            for key, url in v.items():
                if url and url.strip() and not url_pattern.match(url.strip()):
                    raise ValueError(f'Invalid URL format for {key}')
        return v
    
    @validator('template_selected')
    def validate_template(cls, v):
        valid_templates = ['modern', 'old-aesthetic', 'creative', 'tech']
        if v not in valid_templates:
            raise ValueError(f'Template must be one of: {", ".join(valid_templates)}')
        return v

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
    unique_identifier: str
    user_id: Any
    template: str
    data: PortfolioData
    is_published: bool = False
    views: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        arbitrary_types_allowed = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str

class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[str] = None