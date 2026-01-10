import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import './ScoreDisplay.css';

/**
 * Displays confidence score with visual indicator
 * 
 * @param {number} score - Confidence score 0-100
 * @param {string} label - Score label
 */
const ScoreDisplay = ({ score, label }) => {
  // Determine color and icon based on score
  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 60) return '#eab308'; // Yellow
    if (score >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle size={24} />;
    if (score >= 60) return <AlertCircle size={24} />;
    return <XCircle size={24} />;
  };

  const color = getScoreColor(score);
  const icon = getScoreIcon(score);

  return (
    <div className="score-display">
      <div className="score-header">
        <div style={{ color }}>{icon}</div>
        <span className="score-label">{label}</span>
      </div>
      
      {/* Progress bar */}
      <div className="score-bar">
        <div 
          className="score-fill" 
          style={{ 
            width: `${score}%`,
            backgroundColor: color 
          }}
        />
      </div>
      
      {/* Score number */}
      <div className="score-number" style={{ color }}>
        {score.toFixed(1)}/100
      </div>
    </div>
  );
};

export default ScoreDisplay;
