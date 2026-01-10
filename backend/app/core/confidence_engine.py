class ConfidenceEngine:
    """
    Main brain that calculates confidence scores
    """
    
    def __init__(self):
        """
        Initialize (setup) the engine
        """
        # Weights determine importance of each check
        self.weights = {
            'semantic_consistency': 0.20,    # 20%
            'uncertainty_markers': 0.15,     # 15%
            'knowledge_grounding': 0.25,     # 25% (most important)
            'source_attribution': 0.15,      # 15%
            'linguistic_confidence': 0.15,   # 15%
            'cross_reference': 0.10          # 10%
        }
    
    def analyze(self, query: str, ai_response: str) -> dict:
        """
        Main function - analyzes AI response and returns scores
        
        Args:
            query: The question user asked
            ai_response: What AI answered
            
        Returns:
            Dictionary with all scores and explanation
        """
        
        # Run all 6 checks
        scores = {
            'semantic_consistency': self.check_consistency(query, ai_response),
            'uncertainty_markers': self.check_uncertainty(ai_response),
            'knowledge_grounding': self.check_facts(ai_response),
            'source_attribution': self.check_sources(ai_response),
            'linguistic_confidence': self.check_language(ai_response),
            'cross_reference': self.check_other_ais(query)
        }
        
        # Calculate final score
        final_score = self.calculate_final_score(scores)
        
        # Generate explanation
        explanation = self.explain_scores(scores, final_score)
        
        return {
            'final_score': final_score,
            'individual_scores': scores,
            'explanation': explanation,
            'recommendation': self.get_recommendation(final_score)
        }
    
    def calculate_final_score(self, scores: dict) -> float:
        """
        Combine all scores using weights
        """
        total = 0
        for check, score in scores.items():
            total += score * self.weights[check]
        
        return round(total, 2)
    
    def get_recommendation(self, score: float) -> str:
        """
        Give user advice based on score
        """
        if score >= 85:
            return "✅ High confidence - Information appears reliable"
        elif score >= 70:
            return "⚠️ Moderate confidence - Verify important claims"
        elif score >= 50:
            return "⚠️ Low confidence - Use with caution"
        else:
            return "🚫 Very low confidence - Seek alternative sources"
    
def check_consistency(self, query: str, response: str) -> float:
    """
    Check 1: Semantic Consistency
    Tests if AI gives same answer to similar questions
    """
    # For now, simplified version
    # Later we'll use AI to rephrase question and check
    
    # Placeholder score
    return 85.0

def check_uncertainty(self, response: str) -> float:
    """
    Check 2: Uncertainty Markers
    Counts hedging words in response
    """
    # Words that indicate uncertainty
    uncertainty_words = [
        'maybe', 'possibly', 'perhaps', 'probably', 
        'might', 'could', 'may', 'unclear',
        'i think', 'i believe', 'seems like',
        'approximately', 'roughly', 'around'
    ]
    
    # Convert to lowercase for matching
    response_lower = response.lower()
    
    # Count uncertainty words
    uncertainty_count = sum(
        response_lower.count(word) 
        for word in uncertainty_words
    )
    
    # Calculate score
    # More uncertainty words = lower score
    # Assume max 5 uncertainty words for worst case
    score = max(0, 100 - (uncertainty_count * 15))
    
    return float(score)

def check_facts(self, response: str) -> float:
    """
    Check 3: Knowledge Grounding
    Verifies factual claims
    """
    # This will be implemented fully later with Wikipedia API
    # For now, placeholder
    return 75.0

def check_sources(self, response: str) -> float:
    """
    Check 4: Source Attribution
    Checks if sources are mentioned
    """
    # Words that indicate sources
    source_indicators = [
        'according to', 'source:', 'research shows',
        'study found', 'published in', 'wikipedia',
        'reported by', 'cited in'
    ]
    
    response_lower = response.lower()
    
    # Check if any source indicators present
    has_sources = any(
        indicator in response_lower 
        for indicator in source_indicators
    )
    
    if has_sources:
        return 85.0
    else:
        return 40.0

def check_language(self, response: str) -> float:
    """
    Check 5: Linguistic Confidence
    Analyzes language patterns
    """
    # Simplified version
    # Strong indicators: "is", "are", "definitely"
    # Weak indicators: "seems", "appears", "suggests"
    
    strong_words = ['is', 'are', 'will', 'definitely', 'certainly']
    weak_words = ['seems', 'appears', 'suggests', 'indicates']
    
    response_lower = response.lower()
    
    strong_count = sum(response_lower.count(w) for w in strong_words)
    weak_count = sum(response_lower.count(w) for w in weak_words)
    
    # More strong words = higher confidence
    if strong_count > weak_count:
        return 80.0
    else:
        return 60.0

def check_other_ais(self, query: str) -> float:
    """
    Check 6: Cross-Reference
    Compares with other AI models
    """
    # Will implement with actual API calls later
    # For now, placeholder
    return 75.0

def explain_scores(self, scores: dict, final_score: float) -> dict:
    """
    Generate human-readable explanation
    """
    explanation = {
        'summary': f"Overall confidence: {final_score}/100",
        'details': []
    }
    
    for check, score in scores.items():
        # Convert snake_case to Title Case
        check_name = check.replace('_', ' ').title()
        
        # Interpret score
        if score >= 80:
            status = "✅ Strong"
        elif score >= 60:
            status = "⚠️ Moderate"
        else:
            status = "❌ Weak"
        
        explanation['details'].append({
            'check': check_name,
            'score': score,
            'status': status
        })
    
    return explanation