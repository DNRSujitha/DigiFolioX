# DigiFolioX - AI-Powered Digital Portfolio Generator

A full-stack web application that helps professionals create stunning, personalized portfolios with AI assistance.

## 🚀 Features

- **AI-Powered Content Generation** - Auto-generate professional about sections and improve project descriptions
- **Smart Validation** - Detects and prevents gibberish inputs (skills, hobbies, certifications)
- **4 Professional Templates** - Modern, Old Aesthetic, Creative, and Tech templates
- **Portfolio Publishing** - Publish portfolios and share with public links
- **Real-time Preview** - See changes instantly
- **Responsive Design** - Works on all devices

## 🏗️ Architecture
User Registration → Template Selection → Portfolio Creation → Publish & Share

text

### Frontend (React + Tailwind CSS)
- **Portfolio Form** - Collects user data with AI validation
- **4 Templates** - Each in separate folder with Entry.jsx receiving data from URL
- **Template Structure**: Entry.jsx → Components (Header, HomePage, Footer, About, Contactus)

### Backend (FastAPI + MongoDB)
- **REST API** - User authentication, portfolio management
- **AI Validation** - Gibberish detection, content validation
- **JWT Authentication** - Secure user sessions

## 📁 Project Structure
``` 
DigiFolioX/
├── digifoliox-backend/ # FastAPI backend
│ ├── app/
│ │ ├── auth.py # JWT authentication
│ │ ├── database.py # MongoDB connection
│ │ ├── main.py # API endpoints
│ │ ├── models.py # Data models with validation
│ │ └── schemas.py # Pydantic schemas
│ └── requirements.txt
│
├── digifoliox-frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Shared components
│ │ ├── modern-style/ # Modern template
│ │ ├── old-aesthetic/ # Old Aesthetic template
│ │ ├── creative/ # Creative template
│ │ ├── tech/ # Tech template
│ │ └── services/
│ │ └── aiService.js # AI validation & generation
│ └── package.json
│
└── README.md
``` 

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: FastAPI, MongoDB, JWT
- **AI**: Google Gemini API (optional)

## 📋 Prerequisites

- Node.js (v18+)
- Python (3.9+)
- MongoDB (local or Atlas)

## 🚀 Quick Start

### Backend Setup
``` sh
cd digifoliox-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
``` 
Frontend Setup
``` sh
cd digifoliox-frontend
npm install
npm run dev
``` 
## 🔑 Environment Variables
Backend (.env)
``` sh
DIGIFOLIOX_MONGODB_URL=mongodb://localhost:27017
DIGIFOLIOX_DATABASE_NAME=portfolio_ai_db
DIGIFOLIOX_SECRET_KEY=your-secret-key
``` 
Frontend (.env)
``` sh
VITE_DIGIFOLIOX_API_BASE_URL=http://localhost:8000
VITE_GEMINI_API_KEY=your_key_here  # Optional
``` 
## 🤖 AI Features
Gibberish Detection - Automatically rejects random inputs like "fufgyuf"

Skill Validation - Ensures real professional skills

About Generation - Creates professional bios from templates

Project Enhancement - Improves descriptions with achievement-focused language

## 📝 License
MIT

## Author

Dodda Sujitha