from pydantic import BaseModel, Field
from typing import Optional, List, Dict

class AnalyzeRequest(BaseModel):
    """
    What data the /analyze endpoint expects
    """
    query: str = Field(..., description="User's original question")
    ai_response: str = Field(..., description="AI's response to analyze")
    model_name: Optional[str] = Field("unknown", description="Which AI model responded")
    
    class Config:
        # Example for API docs
        json_schema_extra = {
            "example": {
                "query": "What is the capital of France?",
                "ai_response": "Paris is the capital of France.",
                "model_name": "gpt-3.5-turbo"
            }
        }

class ScoreBreakdown(BaseModel):
    """
    Individual confidence scores
    """
    semantic_consistency: float
    uncertainty_markers: float
    knowledge_grounding: float
    source_attribution: float
    linguistic_confidence: float
    cross_reference: float

class AnalyzeResponse(BaseModel):
    """
    What /analyze endpoint returns
    """
    final_score: float = Field(..., description="Overall confidence score 0-100")
    individual_scores: ScoreBreakdown
    explanation: Dict
    recommendation: str
    analysis_id: Optional[int] = None
    processing_time_ms: Optional[int] = None

class UserRegister(BaseModel):
    """
    Data needed to create account
    """
    email: str
    password: str
    
class UserLogin(BaseModel):
    """
    Data needed to login
    """
    email: str
    password: str

class Token(BaseModel):
    """
    Authentication token
    """
    access_token: str
    token_type: str