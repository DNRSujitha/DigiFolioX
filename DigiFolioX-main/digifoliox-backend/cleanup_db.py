# cleanup_db.py
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

async def cleanup_database():
    """Delete all data and recreate database with proper structure"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(os.getenv("DIGIFOLIOX_MONGODB_URL"))
    
    # Get database name
    db_name = os.getenv("DIGIFOLIOX_DATABASE_NAME", "portfolio_ai_db")
    
    print(f"WARNING: This will delete ALL data in database '{db_name}'")
    print("Are you sure? Type 'YES' to confirm: ", end="")
    confirm = input()
    
    if confirm != "YES":
        print("Operation cancelled")
        return
    
    try:
        # Drop the database
        await client.drop_database(db_name)
        print(f"✓ Database '{db_name}' deleted successfully")
        
        # Create new database (it will be created automatically when we insert data)
        db = client[db_name]
        
        # Create indexes
        await db.users.create_index("email", unique=True)
        await db.users.create_index("username", unique=True, sparse=True)
        await db.portfolios.create_index("unique_identifier", unique=True)
        await db.portfolios.create_index("user_id")
        await db.portfolios.create_index([("is_published", 1), ("created_at", -1)])
        
        print("✓ Indexes created successfully")
        print(f"✓ New database '{db_name}' is ready for use")
        print("\nYou can now create new portfolios with proper validation!")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(cleanup_database())