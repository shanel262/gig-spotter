const spotify = require("./spotify/playlist");
const ticketmaster = require("./ticketmaster/search");

// create a handler for the /playlist route
const handlePlaylistArtists = async (req, res, query) => {
  const playlistUrl = query.playlist_url;
  if (!playlistUrl) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing playlist_url query parameter" }));
    return;
  }
  const playlistArtists = await spotify.getPlaylistArtists(playlistUrl);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(playlistArtists));
};

const handleGigsByPlaylist = async (req, res, query) => {
  const playlistUrl = query.playlist_url;
  if (!playlistUrl) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing playlist_url query parameter" }));
    return;
  }
  let playlistArtists = await spotify.getPlaylistArtists(playlistUrl);
  console.log("playlistArtists: ", playlistArtists);
  console.log("playlistArtists[0]: ", playlistArtists[3]);

  // ONLY GET THE FIRST ARTIST FOR NOW
  playlistArtists = [playlistArtists[3]];

  // get the gigs for the playlist artists
  let gigs = {};
  for (const artist of playlistArtists) {
    const artistGigs = await ticketmaster.searchEventsByArtist(artist);
    gigs[artist] = artistGigs.map(ticketmaster.parseEvent);
  }
  console.log("gigs: ", gigs);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(gigs));
};

module.exports = { handlePlaylistArtists, handleGigsByPlaylist };
