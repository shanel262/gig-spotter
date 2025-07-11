const spotify = require('./spotify/playlist');

// create a handler for the /playlist route
const handlePlaylist = async (req, res, query) => {
  const playlistUrl = query.playlist_url;
  if (!playlistUrl) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing playlist_url query parameter' }));
    return;
  }
  const playlist = await spotify.getPlaylist(playlistUrl);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(playlist));
};

module.exports = { handlePlaylist };
