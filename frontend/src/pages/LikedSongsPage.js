import React, { useState } from 'react';
import Parameters from '../components/Parameters';
import Results from '../components/Results';
import { getLikedSongsArtists, formatErrorMessage } from '../services/api';
import './SearchPage.css';

// LikedSongsPage component - allows users to search for gigs based on their liked songs playlist
// This is a placeholder implementation since the backend endpoint doesn't exist yet
const LikedSongsPage = () => {
  // State management for the search functionality
  const [parameters, setParameters] = useState([
    {
      id: 'country',
      type: 'dropdown',
      label: 'Country',
      value: '',
      required: false,
      options: [
        { value: 'US', label: 'United States' },
        { value: 'GB', label: 'United Kingdom' },
        { value: 'CA', label: 'Canada' },
        { value: 'AU', label: 'Australia' },
        { value: 'DE', label: 'Germany' },
        { value: 'FR', label: 'France' },
        { value: 'NL', label: 'Netherlands' },
        { value: 'SE', label: 'Sweden' },
        { value: 'NO', label: 'Norway' },
        { value: 'DK', label: 'Denmark' }
      ]
    },
    {
      id: 'city',
      type: 'text',
      label: 'City (Optional)',
      placeholder: 'e.g., New York, London, Toronto',
      value: '',
      required: false
    },
    {
      id: 'timeRange',
      type: 'radio',
      label: 'Time Range',
      value: 'medium_term',
      required: true,
      options: [
        { value: 'short_term', label: 'Last 4 weeks' },
        { value: 'medium_term', label: 'Last 6 months' },
        { value: 'long_term', label: 'All time' }
      ]
    },
    {
      id: 'includeAlternative',
      type: 'checkbox',
      label: 'Include alternative search paths',
      value: false,
      required: false
    }
  ]);

  // State for search results and UI states
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle parameter changes from the Parameters component
  const handleParameterChange = (id, value) => {
    setParameters(prevParameters => 
      prevParameters.map(param => 
        param.id === id ? { ...param, value } : param
      )
    );
  };

  // Main search function that calls the backend API
  const handleSearch = async () => {
    try {
      // Reset previous results and errors
      setResults(null);
      setError(null);
      setLoading(true);

      // Call the backend API to get gigs for liked songs artists
      // This is currently a placeholder since the endpoint doesn't exist
      console.log('Searching for gigs with liked songs...');
      const gigsData = await getLikedSongsArtists();
      
      console.log('Received gigs data:', gigsData);
      setResults(gigsData);

    } catch (err) {
      console.error('Search error:', err);
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Search by Liked Songs</h1>
        <p>
          Find gigs based on your Spotify liked songs playlist. 
          We'll analyze your music taste and find upcoming events for your favorite artists.
        </p>
      </div>

      {/* Parameters component for user input */}
      <Parameters 
        parameters={parameters}
        onParameterChange={handleParameterChange}
        onSubmit={handleSearch}
      />

      {/* Results component to display search results */}
      <Results 
        results={results}
        loading={loading}
        error={error}
      />

      {/* Help section with instructions */}
      <div className="help-section">
        <h3>About Liked Songs Search:</h3>
        <p>
          This feature analyzes your Spotify liked songs to find gigs for artists you love. 
          The search considers your listening patterns and preferences to provide personalized recommendations.
        </p>
        <div className="feature-status">
          <h4>Feature Status: Coming Soon</h4>
          <p>
            This feature is currently under development. The backend endpoint for accessing liked songs 
            data needs to be implemented. For now, you can use the "Search by Playlist" feature 
            to find gigs for specific playlists.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LikedSongsPage; 
