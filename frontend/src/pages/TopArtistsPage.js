import React, { useState } from 'react';
import Parameters from '../components/Parameters';
import Results from '../components/Results';
import { getTopArtists, formatErrorMessage } from '../services/api';
import './SearchPage.css';

// TopArtistsPage component - allows users to search for gigs based on their most listened artists
// This is a placeholder implementation since the backend endpoint doesn't exist yet
const TopArtistsPage = () => {
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
      id: 'artistLimit',
      type: 'dropdown',
      label: 'Number of Artists',
      value: '10',
      required: true,
      options: [
        { value: '5', label: 'Top 5 artists' },
        { value: '10', label: 'Top 10 artists' },
        { value: '20', label: 'Top 20 artists' },
        { value: '50', label: 'Top 50 artists' }
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

      // Call the backend API to get gigs for top artists
      // This is currently a placeholder since the endpoint doesn't exist
      console.log('Searching for gigs with top artists...');
      const gigsData = await getTopArtists();
      
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
        <h1>Search by Top Artists</h1>
        <p>
          Find gigs based on your most listened artists on Spotify. 
          We'll analyze your listening history and find upcoming events for your favorite musicians.
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
        <h3>About Top Artists Search:</h3>
        <p>
          This feature analyzes your Spotify listening history to find your most played artists 
          and searches for their upcoming gigs. You can choose different time ranges to get 
          recommendations based on your recent or long-term listening habits.
        </p>
        <div className="feature-status">
          <h4>Feature Status: Coming Soon</h4>
          <p>
            This feature is currently under development. The backend endpoint for accessing top artists 
            data needs to be implemented. For now, you can use the "Search by Playlist" feature 
            to find gigs for specific playlists.
          </p>
        </div>
        <div className="time-range-info">
          <h4>Time Range Options:</h4>
          <ul>
            <li><strong>Last 4 weeks:</strong> Based on your recent listening activity</li>
            <li><strong>Last 6 months:</strong> Based on your medium-term listening patterns</li>
            <li><strong>All time:</strong> Based on your complete listening history</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopArtistsPage; 
