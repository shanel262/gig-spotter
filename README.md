# gig-spotter

An app to find gigs based on Spotify playlists.

## Prerequisites
- Setup .env file. You'll need:
    - A Spotify Client ID (create a Spotify app) and assign it to `SPOTIFY_CLIENT_ID`
    - A Spotify Client Secret (create a Spotify app) and assign it to `SPOTIFY_CLIENT_SECRET`
    - A Ticketmaster Consumer Key (create a Ticketmaster App) and assign it to `TICKETMASTER_CONSUMER_KEY`

## API

### GET `/playlistArtists`

**Query Parameters:**
- `playlist_url` (required): The full Spotify playlist URL.

**Response:**
- A unique array of artists from the playlist

### GET `/gigsByPlaylist`

**Query Parameters:**
- `playlist_url` (required): The full Spotify playlist URL.

**Response:**
- An array of gigs for each artist in the playlist
