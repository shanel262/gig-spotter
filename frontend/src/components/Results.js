import React, { useState } from 'react';
import './Results.css';

// Results component that displays a list of artists with their associated events
// Each artist item can be expanded to show detailed event information
const Results = ({ results, loading, error }) => {
  // State to track which artist items are expanded
  const [expandedArtists, setExpandedArtists] = useState(new Set());

  // Toggle expansion state for a specific artist
  const toggleArtistExpansion = (artistName) => {
    const newExpanded = new Set(expandedArtists);
    if (newExpanded.has(artistName)) {
      newExpanded.delete(artistName);
    } else {
      newExpanded.add(artistName);
    }
    setExpandedArtists(newExpanded);
  };

  // Handle ticket search button click
  const handleTicketSearch = (eventUrl) => {
    if (eventUrl) {
      window.open(eventUrl, '_blank');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Render loading state
  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Searching for gigs...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="results-container">
        <div className="error-state">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!results || Object.keys(results).length === 0) {
    return (
      <div className="results-container">
        <div className="empty-state">
          <h3>No Results Found</h3>
          <p>Try adjusting your search parameters or try a different search type.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2>Search Results</h2>
      
      {/* Render each artist with their events */}
      <div className="artists-list">
        {Object.entries(results).map(([artistName, events]) => (
          <div key={artistName} className="artist-item">
            {/* Artist header - always visible */}
            <div 
              className="artist-header"
              onClick={() => toggleArtistExpansion(artistName)}
            >
              <div className="artist-info">
                <div className="artist-avatar">
                  {/* Use event image if available, otherwise show first letter */}
                  {events.length > 0 && events[0].image ? (
                    <img 
                      src={events[0].image} 
                      alt={artistName}
                      className="artist-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className="avatar-placeholder">
                    {artistName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="artist-details">
                  <h3 className="artist-name">{artistName}</h3>
                  <p className="artist-events-count">
                    {events.length} event{events.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
              
              {/* Expand/collapse indicator */}
              <div className="expand-indicator">
                {expandedArtists.has(artistName) ? '▼' : '▶'}
              </div>
            </div>

            {/* Events list - only visible when expanded */}
            {expandedArtists.has(artistName) && (
              <div className="events-list">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <div key={index} className="event-item">
                      {/* Event image */}
                      {event.image && (
                        <div className="event-image">
                          <img 
                            src={event.image} 
                            alt={event.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="event-info">
                        <div className="event-name">
                          <h4>{event.name}</h4>
                        </div>
                        
                        <div className="event-date-time">
                          <strong>{formatDate(event.date)}</strong>
                          {event.time && (
                            <span className="event-time"> at {formatTime(event.time)}</span>
                          )}
                        </div>
                        
                        <div className="event-venue">
                          <strong>{event.venue.name}</strong>
                        </div>
                        
                        <div className="event-location">
                          {event.venue.city}
                          {event.venue.state && `, ${event.venue.state}`}
                          {event.venue.country && `, ${event.venue.country}`}
                        </div>
                        
                        {/* Price information if available */}
                        {(event.priceMin || event.priceMax) && (
                          <div className="event-price">
                            {event.priceMin && event.priceMax ? (
                              `${event.priceMin} - ${event.priceMax}`
                            ) : (
                              event.priceMin || event.priceMax
                            )}
                          </div>
                        )}
                        
                        {/* Event info/description if available */}
                        {event.info && (
                          <div className="event-description">
                            <p>{event.info.substring(0, 150)}...</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Ticket search button */}
                      <div className="event-actions">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleTicketSearch(event.link)}
                          disabled={!event.link}
                        >
                          {event.link ? 'Get Tickets' : 'Tickets Unavailable'}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-events">
                    <p>No upcoming events found for this artist.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results; 
