from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalyzeRequest, AnalyzeResponse
from app.core.confidence_engine import ConfidenceEngine
import time

# Create router
router = APIRouter(prefix="/api", tags=["Analysis"])

# Initialize confidence engine
engine = ConfidenceEngine()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_response(request: AnalyzeRequest):
    """
    Analyze an AI response for confidence
    
    This endpoint:
    1. Takes user's question and AI's answer
    2. Runs 6 confidence checks
    3. Returns scores and explanation
    """
    
    try:
        # Record start time
        start_time = time.time()
        
        # Run analysis
        result = engine.analyze(
            query=request.query,
            ai_response=request.ai_response
        )
        
        # Calculate processing time
        processing_time = int((time.time() - start_time) * 1000)  # milliseconds
        
        # Add metadata
        result['processing_time_ms'] = processing_time
        
        # Return results
        return AnalyzeResponse(**result)
        
    except Exception as e:
        # If something goes wrong
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@router.get("/analyze/history")
async def get_analysis_history():
    """
    Get past analyses
    (Will implement with database later)
    """
    return {
        "message": "History endpoint - coming soon!",
        "analyses": []
    }