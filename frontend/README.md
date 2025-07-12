# Gig Spotter Frontend

A React-based frontend application for discovering live music events based on Spotify data. This application allows users to find gigs for their favorite artists using different search methods.

## Features

### 🎵 Search by Playlist
- Enter any Spotify playlist URL
- Find gigs for all artists in the playlist
- Filter by location and date range
- **Currently Working** - Backend integration complete

### ❤️ Search by Liked Songs
- Uses your Spotify liked songs playlist
- Automatic artist extraction
- Personalized gig recommendations
- **Coming Soon** - Backend endpoint needs implementation

### 🏆 Search by Top Artists
- Based on your listening history
- Top artists from different time periods
- Most relevant gig suggestions
- **Coming Soon** - Backend endpoint needs implementation

## Technology Stack

- **React 18** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing for multi-page layout
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with responsive design
- **ES6+** - Modern JavaScript features

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.js       # Navigation header with dropdown
│   │   ├── Parameters.js   # Dynamic form inputs
│   │   └── Results.js      # Search results display
│   ├── pages/              # Page components
│   │   ├── HomePage.js     # Landing page
│   │   ├── PlaylistSearchPage.js
│   │   ├── LikedSongsPage.js
│   │   └── TopArtistsPage.js
│   ├── services/           # API and utility services
│   │   └── api.js          # Backend API communication
│   ├── App.js              # Main app component with routing
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Backend server running on `http://localhost:3010`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Component Architecture

### Header Component
- Sticky navigation header
- Dropdown menu for search type navigation
- Responsive design with mobile-friendly layout

### Parameters Component
- Dynamic form rendering based on parameter configuration
- Supports multiple input types:
  - Text inputs
  - Dropdown selects
  - Radio buttons
  - Checkboxes
- Form validation and error handling

### Results Component
- Expandable artist items
- Event details with venue, date, and location
- Direct ticket search links
- Loading, error, and empty states

## API Integration

The frontend communicates with the backend through the `api.js` service module:

- **Base URL**: `http://localhost:3010` (configurable via environment variables)
- **Endpoints**:
  - `GET /playlistArtists` - Get artists from a playlist
  - `GET /gigsByPlaylist` - Get gigs for playlist artists
  - Placeholder endpoints for liked songs and top artists

### Error Handling

- Comprehensive error handling with user-friendly messages
- Network error detection and retry logic
- Loading states for better UX

## Styling

- Modern, responsive design with Spotify-inspired color scheme
- CSS Grid and Flexbox for layouts
- Smooth animations and transitions
- Mobile-first responsive design
- Consistent component styling

## Development Notes

### State Management
- Uses React hooks for local state management
- Component-level state for form data and UI states
- No external state management library required for current scope

### Routing
- React Router 6 for client-side routing
- Nested routes for different search types
- Programmatic navigation support

### Code Organization
- Modular component structure
- Reusable components with clear interfaces
- Comprehensive comments for backend developers
- Consistent naming conventions

## Future Enhancements

1. **Authentication**: Spotify OAuth integration
2. **User Profiles**: Save favorite searches and artists
3. **Notifications**: Email/SMS alerts for new gigs
4. **Advanced Filtering**: Date ranges, price filters, venue types
5. **Social Features**: Share gigs with friends
6. **Offline Support**: Service worker for offline functionality

## Contributing

1. Follow the existing code style and patterns
2. Add comprehensive comments for backend developers
3. Test components thoroughly
4. Update documentation for new features

## Troubleshooting

### Common Issues

1. **Backend Connection Error**: Ensure the backend server is running on port 3010
2. **CORS Issues**: Backend should have CORS headers configured
3. **Build Errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use browser developer tools for debugging
- Check console logs for API request/response details
- Test on different screen sizes for responsive design
- Verify all form validations work correctly

## License

This project is part of the Gig Spotter application. See the main project README for license information. 
