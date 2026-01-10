
// File: frontend/src/services/api.js

import axios from 'axios';

// Base URL for our backend
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions

/**
 * Analyze an AI response
 * @param {string} query - User's question
 * @param {string} aiResponse - AI's answer
 * @param {string} modelName - Which AI model
 * @returns {Promise} Analysis results
 */
export const analyzeResponse = async (query, aiResponse, modelName = 'unknown') => {
  try {
    const response = await api.post('/api/analyze', {
      query,
      ai_response: aiResponse,
      model_name: modelName,
    });
    return response.data;
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
};

/**
 * Get analysis history
 * @returns {Promise} List of past analyses
 */
export const getHistory = async () => {
  try {
    const response = await api.get('/api/analyze/history');
    return response.data;
  } catch (error) {
    console.error('History error:', error);
    throw error;
  }
};

/**
 * Check if API is healthy
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export default api;