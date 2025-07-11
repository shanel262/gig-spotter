# gig-spotter

An app to find gigs based on Spotify playlists.

## Prerequisites
- Setup .env file. You'll need:
    - A Spotify Client ID (create a Spotify app) and assign it to `SPOTIFY_CLIENT_ID`
    - A Spotify Client Secret (create a Spotify app) and assign it to `SPOTIFY_CLIENT_SECRET`

## API

### GET `/playlist`

**Query Parameters:**
- `playlist_url` (required): The full Spotify playlist URL.

**Response:**
- The playlist json
