import React, { useState } from 'react';
import AnalysisForm from '../components/AnalysisForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { analyzeResponse } from '../services/api';
import { Brain, TrendingUp, Shield, Zap } from 'lucide-react';
import './HomePage.css';

/**
 * Main application page
 */
const HomePage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysis = async (formData) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await analyzeResponse(
        formData.query,
        formData.aiResponse,
        formData.modelName
      );
      
      setResults(response);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
      
    } catch (err) {
      setError(
        'Failed to analyze response. Please check if the backend is running.'
      );
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <Brain size={32} />
            <h1>TrustScore AI</h1>
          </div>
          <nav>
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#analyze">Analyze</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Know When to Trust AI Responses
          </h1>
          <p className="hero-subtitle">
            Advanced multi-factor analysis to evaluate the reliability of AI-generated content
          </p>
          <button 
            className="cta-button"
            onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Try It Now
          </button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="features">
        <div className="container">
          <h2>Why TrustScore AI?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <TrendingUp size={32} />
              <h3>Multi-Dimensional Analysis</h3>
              <p>6 independent confidence checks for comprehensive evaluation</p>
            </div>
            <div className="feature-card">
              <Shield size={32} />
              <h3>Fact Verification</h3>
              <p>Cross-references claims with reliable knowledge bases</p>
            </div>
            <div className="feature-card">
              <Zap size={32} />
              <h3>Instant Results</h3>
              <p>Get confidence scores in milliseconds</p>
            </div>
            <div className="feature-card">
              <Brain size={32} />
              <h3>Actionable Insights</h3>
              <p>Clear explanations and verification recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Submit AI Response</h3>
              <p>Paste any AI-generated answer you want to verify</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Our system runs 6 different confidence checks</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Results</h3>
              <p>Receive a confidence score with detailed explanation</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Make Informed Decisions</h3>
              <p>Know exactly what to verify and what you can trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section id="analyze-section" className="analyze-section">
        <div className="container">
          <h2>Analyze AI Response</h2>
          
          <AnalysisForm 
            onSubmit={handleAnalysis} 
            loading={loading}
          />

          {error && (
            <div className="error-message">
              <AlertTriangle size={20} />
              <p>{error}</p>
            </div>
          )}

          <div id="results-section">
            <ResultsDisplay results={results} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 TrustScore AI - B.Tech Final Year Project</p>
          <p>Built with React, FastAPI, and Machine Learning</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
