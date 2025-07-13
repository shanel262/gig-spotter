import React, { useState } from 'react';
import Parameters from '../components/Parameters';
import Results from '../components/Results';
import { getGigsByPlaylist, formatErrorMessage } from '../services/api';
import './SearchPage.css';

const PLAYLIST_QUERY_BY = 'playlist';
const LIKED_SONGS_QUERY_BY = 'likedSongs';
const TOP_ARTISTS_QUERY_BY = 'topArtists';
const TOP_TRACKS_QUERY_BY = 'topTracks';

// PlaylistSearchPage component - allows users to search for gigs based on artists in a Spotify playlist
// This page combines the Parameters component for input and Results component for displaying gigs
const PlaylistSearchPage = () => {
  // State management for the search functionality
  const [parameters, setParameters] = useState([
    {
      id: 'queryBy',
      type: 'dropdown',
      label: 'Query By',
      placeholder: 'Select an option',
      value: LIKED_SONGS_QUERY_BY,
      required: true,
      options: [
        { value: PLAYLIST_QUERY_BY, label: 'Artists in Playlist' },
        { value: LIKED_SONGS_QUERY_BY, label: 'Artists in Liked Songs' },
        { value: TOP_ARTISTS_QUERY_BY, label: 'Artists in Top Artists' },
        { value: TOP_TRACKS_QUERY_BY, label: 'Artists in Top Tracks' }
      ]
    },
    {
      id: 'playlistUrl',
      type: 'text',
      label: 'Spotify Playlist URL',
      placeholder: 'https://open.spotify.com/playlist/...',
      value: '',
      required: true
    },
    {
      id: 'country',
      type: 'dropdown',
      label: 'Country',
      value: '',
      required: false,
      options: [
        { value: 'IE', label: 'Ireland' },
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

  // Function to validate required parameters before making API call
  const validateParameters = () => {
    const requiredParams = parameters.filter(param => param.required);
    const missingParams = requiredParams.filter(param => !param.value.trim());
    
    if (missingParams.length > 0) {
      const missingLabels = missingParams.map(param => param.label).join(', ');
      throw new Error(`Please fill in the following required fields: ${missingLabels}`);
    }
  };

  // Function to validate Spotify playlist URL format
  const validatePlaylistUrl = (url) => {
    const spotifyPlaylistRegex = /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+/;
    if (!spotifyPlaylistRegex.test(url)) {
      throw new Error('Please enter a valid Spotify playlist URL');
    }
  };

  // Main search function that calls the backend API
  const handleSearch = async () => {
    try {
      // Reset previous results and errors
      setResults(null);
      setError(null);
      setLoading(true);

      // Validate parameters
      validateParameters();
      
      // Call the appropriate function based on the query by parameter
      let gigsData;
      switch (parameters.find(p => p.id === 'queryBy').value) {
        case 'playlist':
        default:
          gigsData = await getGigsByPlaylistPath();
          break;
        // case 'likedSongs':
        //   gigsData = await getGigsByLikedSongsPath(playlistUrl);
      }
      
      console.log('Received gigs data:', gigsData);
      setResults(gigsData);

    } catch (err) {
      console.error('Search error:', err);
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getGigsByPlaylistPath = async () => {
    // Get playlist URL from parameters
    const playlistUrl = parameters.find(p => p.id === 'playlistUrl').value;
    validatePlaylistUrl(playlistUrl);

    // Call the backend API to get gigs for the playlist
    console.log('Searching for gigs with playlist URL:', playlistUrl);
    const gigsData = await getGigsByPlaylist(playlistUrl);
    return gigsData;
  }

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Search by Playlist</h1>
        <p>
          Enter a Spotify playlist URL to find gigs for all artists in that playlist. 
          You can also filter by location to find events near you.
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
        <h3>How to find your Spotify playlist URL:</h3>
        <ol>
          <li>Open Spotify and navigate to the playlist you want to search</li>
          <li>Click the "Share" button (three dots menu)</li>
          <li>Select "Copy link to playlist"</li>
          <li>Paste the URL in the field above</li>
        </ol>
        <p className="help-note">
          <strong>Note:</strong> The playlist must be public or you must be the owner for this to work.
        </p>
      </div>
    </div>
  );
};

export default PlaylistSearchPage; 
