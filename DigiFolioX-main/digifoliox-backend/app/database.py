from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: AsyncIOMotorClient = None
    db = None
    
    @classmethod
    async def connect_to_mongo(cls):
        """Connect to MongoDB"""
        try:
            cls.client = AsyncIOMotorClient(os.getenv("DIGIFOLIOX_MONGODB_URL"))
            cls.db = cls.client[os.getenv("DIGIFOLIOX_DATABASE_NAME")]
            
            # Test connection
            await cls.client.admin.command('ping')
            print("Successfully connected to MongoDB")
            
            # Create indexes
            await cls.create_indexes()
            
        except ConnectionFailure as e:
            print(f"Failed to connect to MongoDB: {e}")
            raise
    
    @classmethod
    async def close_mongo_connection(cls):
        """Close MongoDB connection"""
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed")
    
    @classmethod
    async def create_indexes(cls):
        """Create necessary indexes"""
        try:
            # Unique email index for users
            await cls.db.users.create_index("email", unique=True)
            
            # Unique username index
            await cls.db.users.create_index("username", unique=True, sparse=True)
            
            # Index for portfolio unique identifier
            await cls.db.portfolios.create_index("unique_identifier", unique=True)
            
            # Index for user_id in portfolios
            await cls.db.portfolios.create_index("user_id")
            
            # Index for published portfolios (for faster public queries)
            await cls.db.portfolios.create_index([("is_published", 1), ("created_at", -1)])
            
            print("Database indexes created")
        except Exception as e:
            print(f"Error creating indexes: {e}")

# Database instance
db = Database()