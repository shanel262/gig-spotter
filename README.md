# Gig Spotter

An app to find gigs based on Spotify playlists.

## Docker Setup

This application is containerized using Docker and Docker Compose.

### Prerequisites

- Docker
- Docker Compose

### Environment Variables

Create a `.env` file in the root directory with your API keys:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
TICKETMASTER_API_KEY=your_ticketmaster_api_key
```

### Running with Docker

#### Development Mode (with hot reloading)
1. **Build and start all services:**
   ```bash
   docker compose up --build
   ```

2. **Run in detached mode:**
   ```bash
   docker compose up -d --build
   ```

3. **Stop all services:**
   ```bash
   docker compose down
   ```

4. **View logs:**
   ```bash
   docker compose logs -f
   ```

**Features:**
- **Backend:** Hot reloading with nodemon
- **Frontend:** Hot reloading with React development server
- **Volume mounts:** Code changes reflect immediately
- **Development dependencies:** All dev tools available

#### Production Mode
1. **Build and start production services:**
   ```bash
   docker compose -f docker-compose.prod.yml up --build
   ```

2. **Run production in detached mode:**
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

### Accessing the Application

- **Frontend:** http://localhost:3020
- **Backend API:** http://localhost:3010

### Development

For development without Docker, you can run the services individually:

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## API Endpoints

- `GET /playlistArtists?playlist_url=...`  
  Returns: Unique array of artists from the playlist

- `GET /gigsByPlaylist?playlist_url=...`  
  Returns: Array of artists, each with an array of events

## Technologies Used

- **Backend:** Node.js, Express
- **Frontend:** React, React Router
- **APIs:** Spotify API, Ticketmaster API
- **Containerization:** Docker, Docker Compose
