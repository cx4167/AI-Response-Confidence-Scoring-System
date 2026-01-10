import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import './AnalysisForm.css';

/**
 * Form for submitting AI responses to analyze
 * 
 * @param {function} onSubmit - Called when form is submitted
 * @param {boolean} loading - Whether analysis is in progress
 */
const AnalysisForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    query: '',
    aiResponse: '',
    modelName: 'gpt-3.5-turbo',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.query.trim() || !formData.aiResponse.trim()) {
      alert('Please fill in both fields');
      return;
    }
    
    onSubmit(formData);
  };

  const handleExample = () => {
    setFormData({
      query: 'What is the capital of France?',
      aiResponse: 'Paris is the capital of France. It has been the capital since 987 AD and is located in northern France.',
      modelName: 'gpt-3.5-turbo',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="analysis-form">
      <div className="form-group">
        <label htmlFor="query">
          Your Question
          <span className="required">*</span>
        </label>
        <input
          type="text"
          id="query"
          name="query"
          value={formData.query}
          onChange={handleChange}
          placeholder="What question did you ask the AI?"
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="aiResponse">
          AI's Response
          <span className="required">*</span>
        </label>
        <textarea
          id="aiResponse"
          name="aiResponse"
          value={formData.aiResponse}
          onChange={handleChange}
          placeholder="Paste the AI's response here..."
          rows={8}
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="modelName">AI Model (Optional)</label>
        <select
          id="modelName"
          name="modelName"
          value={formData.modelName}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          <option value="claude-3">Claude 3</option>
          <option value="claude-sonnet">Claude Sonnet</option>
          <option value="unknown">Unknown/Other</option>
        </select>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={handleExample}
          className="btn btn-secondary"
          disabled={loading}
        >
          Load Example
        </button>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="spinner" size={16} />
              Analyzing...
            </>
          ) : (
            'Analyze Confidence'
          )}
        </button>
      </div>
    </form>
  );
};

export default AnalysisForm;
