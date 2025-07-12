import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// HomePage component - the main landing page that provides navigation to different search types
// This page gives users an overview of available features and quick access to different search options
const HomePage = () => {
  // Define the different search options available to users
  const searchOptions = [
    {
      id: 'playlist',
      title: 'Search by Playlist',
      description: 'Find gigs based on artists in a specific Spotify playlist',
      icon: '🎵',
      path: '/playlist-search',
      features: [
        'Enter any Spotify playlist URL',
        'Discover gigs for all artists in the playlist',
        'Filter by location and date range'
      ]
    },
    {
      id: 'liked-songs',
      title: 'Search by Liked Songs',
      description: 'Find gigs based on your liked songs playlist',
      icon: '❤️',
      path: '/liked-songs',
      features: [
        'Uses your Spotify liked songs',
        'Automatic artist extraction',
        'Personalized gig recommendations'
      ]
    },
    {
      id: 'top-artists',
      title: 'Search by Top Artists',
      description: 'Find gigs based on your most listened artists',
      icon: '🏆',
      path: '/top-artists',
      features: [
        'Based on your listening history',
        'Top artists from different time periods',
        'Most relevant gig suggestions'
      ]
    }
  ];

  return (
    <div className="home-page">
      {/* Hero section with app introduction */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🎵 Gig Spotter
          </h1>
          <p className="hero-subtitle">
            Discover live music events based on your Spotify taste
          </p>
          <p className="hero-description">
            Connect your Spotify account and find gigs for your favorite artists. 
            Whether it's from a playlist, your liked songs, or your top artists, 
            we'll help you discover amazing live music experiences.
          </p>
        </div>
      </section>

      {/* Search options section */}
      <section className="search-options-section">
        <h2 className="section-title">Choose Your Search Method</h2>
        <p className="section-description">
          Select how you'd like to find gigs based on your music preferences
        </p>
        
        <div className="search-options-grid">
          {searchOptions.map((option) => (
            <div key={option.id} className="search-option-card">
              <div className="search-option-icon">
                {option.icon}
              </div>
              
              <div className="search-option-content">
                <h3 className="search-option-title">{option.title}</h3>
                <p className="search-option-description">{option.description}</p>
                
                <ul className="search-option-features">
                  {option.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={option.path} className="btn btn-primary search-option-button">
                  Start Searching
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Connect</h3>
            <p>Choose your preferred search method and provide the necessary information</p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Search</h3>
            <p>Our system analyzes your music data and searches for upcoming events</p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h3>Discover</h3>
            <p>Browse through found gigs and get direct links to purchase tickets</p>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <section className="footer-section">
        <p className="footer-text">
          Powered by Spotify and Ticketmaster APIs
        </p>
      </section>
    </div>
  );
};

export default HomePage; 
