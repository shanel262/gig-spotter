const axios = require("axios");
const auth = require("./auth");

// only get the artists for the tracks
const artistFields = "tracks.items.track.album.artists";

async function getPlaylistArtists(playlistUrl) {
  try {
    // get the playlist id from the playlist url
    const playlistId = getPlaylistID(playlistUrl);
    console.log(playlistId);

    // get the access token
    let error, accessToken = await auth.getAccessToken();
    if (error) {
      console.error("error getting access token: ", error);
      return;
    }
    if (!accessToken) {
      console.error("no access token", accessToken);
      return;
    }

    // get the playlist by id
    const playlist = await getPlaylistByID(playlistId, accessToken, artistFields);
    return parsePlaylistArtists(playlist);
  } catch (error) {
    console.error("error getting playlist: ", error);
  }
}

function parsePlaylistArtists(playlist) {
    let artistsDetails = playlist.tracks.items.map(item => item.track.album.artists);
    let artists = artistsDetails.flatMap(artist => artist.map(a => a.name));
    // deduplicate
    artists = [...new Set(artists)];
    return artists;
}

async function getPlaylistByID(playlistId, accessToken, fields = null) {
    // make a request to the spotify api to get the playlist
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        fields: fields,
      },
    };
    // console.log("options: ", { url, ...options });

    try {
      const response = await axios.get(url, options);
      // console.log("playlist: ", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("error getting playlist: ", error.response.status, error.response.data);
      } else {
        console.error("error getting playlist: ", error.message);
      }
      return;
    }
}

function getPlaylistID(playlistUrl) {
  // parse url
  const url = new URL(playlistUrl);
  const path = url.pathname;

  // verify the path is /playlist/alphanumericId
  if (!path.match(/^\/playlist\/[a-zA-Z0-9]+$/)) {
    throw new Error("Invalid playlist URL");
  }

  // extract the alphanumericId
  const alphanumericId = path.split("/")[2];
  return alphanumericId;
}

module.exports = { getPlaylistArtists };
