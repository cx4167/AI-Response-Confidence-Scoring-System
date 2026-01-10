import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import './ResultsDisplay.css';

/**
 * Displays analysis results
 * 
 * @param {object} results - Analysis results from API
 */
const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  const {
    final_score,
    individual_scores,
    explanation,
    recommendation,
    processing_time_ms,
  } = results;

  // Get recommendation icon
  const getRecommendationIcon = (score) => {
    if (score >= 80) return <CheckCircle size={24} color="#22c55e" />;
    if (score >= 60) return <Info size={24} color="#eab308" />;
    return <AlertTriangle size={24} color="#ef4444" />;
  };

  return (
    <div className="results-display">
      {/* Main Score Card */}
      <div className="main-score-card">
        <h2>Confidence Analysis Results</h2>
        
        <div className="final-score">
          <div className="score-circle" style={{
            background: `conic-gradient(
              ${final_score >= 80 ? '#22c55e' : final_score >= 60 ? '#eab308' : '#ef4444'} ${final_score * 3.6}deg,
              #f3f4f6 ${final_score * 3.6}deg
            )`
          }}>
            <div className="score-inner">
              <div className="score-value">{final_score.toFixed(1)}</div>
              <div className="score-max">/100</div>
            </div>
          </div>
        </div>

        <div className="recommendation">
          {getRecommendationIcon(final_score)}
          <p>{recommendation}</p>
        </div>

        {processing_time_ms && (
          <div className="processing-time">
            ⚡ Analyzed in {processing_time_ms}ms
          </div>
        )}
      </div>

      {/* Individual Scores */}
      <div className="individual-scores">
        <h3>Detailed Breakdown</h3>
        
        <ScoreDisplay 
          score={individual_scores.semantic_consistency} 
          label="Semantic Consistency"
        />
        <ScoreDisplay 
          score={individual_scores.uncertainty_markers} 
          label="Certainty Level"
        />
        <ScoreDisplay 
          score={individual_scores.knowledge_grounding} 
          label="Factual Grounding"
        />
        <ScoreDisplay 
          score={individual_scores.source_attribution} 
          label="Source Attribution"
        />
        <ScoreDisplay 
          score={individual_scores.linguistic_confidence} 
          label="Linguistic Confidence"
        />
        <ScoreDisplay 
          score={individual_scores.cross_reference} 
          label="Cross-Reference"
        />
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="explanation">
          <h3>What This Means</h3>
          <p className="summary">{explanation.summary}</p>
          
          {explanation.details && (
            <div className="details-list">
              {explanation.details.map((detail, index) => (
                <div key={index} className="detail-item">
                  <strong>{detail.check}:</strong> {detail.status}
                  <span className="detail-score">({detail.score.toFixed(1)})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;