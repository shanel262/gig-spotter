import axios from 'axios';

// API service module for handling all backend communication
// This centralizes all API calls and provides consistent error handling

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010',
  timeout: 600000, // 10 minute timeout (600,000 milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and common headers
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received');
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API functions for different endpoints

/**
 * Get artists from a Spotify playlist
 * @param {string} playlistUrl - The Spotify playlist URL
 * @returns {Promise<Array>} Array of artist names
 */
export const getPlaylistArtists = async (playlistUrl) => {
  try {
    const response = await api.get('/playlistArtists', {
      params: { playlist_url: playlistUrl }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get playlist artists: ${error.message}`);
  }
};

/**
 * Get gigs for artists in a playlist
 * @param {string} playlistUrl - The Spotify playlist URL
 * @returns {Promise<Object>} Object with artist names as keys and events as values
 */
export const getGigsByPlaylist = async (playlistUrl) => {
  try {
    const response = await api.get('/gigsByPlaylist', {
      params: { playlist_url: playlistUrl }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get gigs by playlist: ${error.message}`);
  }
};

/**
 * Get user's top artists (placeholder for future implementation)
 * @returns {Promise<Array>} Array of top artist names
 */
export const getTopArtists = async () => {
  try {
    // This endpoint doesn't exist yet, but we'll create a placeholder
    // In the future, this would call a backend endpoint like '/topArtists'
    throw new Error('Top artists endpoint not implemented yet');
  } catch (error) {
    throw new Error(`Failed to get top artists: ${error.message}`);
  }
};

/**
 * Get user's liked songs artists (placeholder for future implementation)
 * @returns {Promise<Array>} Array of artist names from liked songs
 */
export const getLikedSongsArtists = async () => {
  try {
    // This endpoint doesn't exist yet, but we'll create a placeholder
    // In the future, this would call a backend endpoint like '/likedSongsArtists'
    throw new Error('Liked songs endpoint not implemented yet');
  } catch (error) {
    throw new Error(`Failed to get liked songs artists: ${error.message}`);
  }
};

// Utility function to format error messages for user display
export const formatErrorMessage = (error) => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

export default api; 
