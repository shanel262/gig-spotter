import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PlaylistSearchPage from './pages/PlaylistSearchPage';
import LikedSongsPage from './pages/LikedSongsPage';
import TopArtistsPage from './pages/TopArtistsPage';
import './App.css';

// Main App component that sets up routing and renders the application structure
// This component uses React Router to handle navigation between different pages
function App() {
  return (
    <Router>
      <div className="App">
        {/* Header component is rendered on all pages for consistent navigation */}
        <Header />
        
        {/* Main content area with routing */}
        <main className="main-content">
          <div className="container">
            {/* Routes define which component to render based on the current URL path */}
            <Routes>
              {/* Home page - the landing page with navigation options */}
              <Route path="/" element={<HomePage />} />
              
              {/* Search by artists in playlist page */}
              <Route path="/playlist-search" element={<PlaylistSearchPage />} />
              
              {/* Search by artists in liked songs playlist page */}
              <Route path="/liked-songs" element={<LikedSongsPage />} />
              
              {/* Search by most listened artists page */}
              <Route path="/top-artists" element={<TopArtistsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App; 
