from sqlalchemy import create_engine

# Database connection string
DATABASE_URL = "postgresql://admin:password123@localhost:5442/confidence_db"

# Try to connect
engine = create_engine(DATABASE_URL)
connection = engine.connect()

print("✅ Successfully connected to database!")
connection.close()