import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// Header component that provides navigation throughout the application
// Contains a dropdown menu for navigating between different search types
const Header = () => {
  // State to control dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Get current location to highlight active page
  const location = useLocation();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Navigation options for the dropdown menu
  const navigationOptions = [
    { path: '/playlist-search', label: 'Search by Playlist', description: 'Find gigs based on artists in a specific playlist' },
    { path: '/liked-songs', label: 'Search by Liked Songs', description: 'Find gigs based on your liked songs playlist' },
    { path: '/top-artists', label: 'Search by Top Artists', description: 'Find gigs based on your most listened artists' }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo/Brand */}
          <Link to="/" className="logo" onClick={closeDropdown}>
            <h1>🎵 Gig Spotter</h1>
          </Link>

          {/* Navigation Dropdown */}
          <div className="nav-dropdown">
            <button 
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Search Options ▼
            </button>
            
            {/* Dropdown menu that appears when toggle is clicked */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {navigationOptions.map((option) => (
                  <Link
                    key={option.path}
                    to={option.path}
                    className={`dropdown-item ${location.pathname === option.path ? 'active' : ''}`}
                    onClick={closeDropdown}
                  >
                    <div className="dropdown-item-content">
                      <span className="dropdown-item-label">{option.label}</span>
                      <span className="dropdown-item-description">{option.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div className="dropdown-overlay" onClick={closeDropdown} />
      )}
    </header>
  );
};

export default Header; 
