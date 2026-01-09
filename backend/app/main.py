from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create app
app = FastAPI(
    title="AI Confidence Scorer API",
    description="Analyzes AI responses for reliability",
    version="1.0.0"
)

# Allow frontend to talk to backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple test endpoint
@app.get("/")
def read_root():
    """
    Test if API is running
    """
    return {
        "message": "AI Confidence Scorer API is running!",
        "status": "healthy"
    }

# Health check
@app.get("/api/health")
def health_check():
    """
    Check if all systems are operational
    """
    return {
        "status": "healthy",
        "database": "connected",  # We'll implement this
        "version": "1.0.0"
    }