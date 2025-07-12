const axios = require("axios");
const auth = require("./auth");

// only get the artists for the tracks
const artistFields = "tracks.items.track.album.artists";
const nameAndArtistFields = "name,tracks";

async function getPlaylistArtists(playlistUrl) {
  try {
    // get the playlist id from the playlist url
    const playlistId = getPlaylistID(playlistUrl);
    console.log("playlistId: ", playlistId);

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
    const playlist = await getPlaylistTracksByID(playlistId, accessToken, null);
    return parsePlaylistArtists(playlist);
  } catch (error) {
    console.error("error getting playlist: ", error.message);
  }
}

function parsePlaylistArtists(playlist) {
    let artistsDetails = playlist.items.map(item => item.track.album.artists);
    let artists = artistsDetails.flatMap(artist => artist.map(a => a.name));
    // deduplicate
    artists = [...new Set(artists)];
    return artists;
}

async function getPlaylistTracksByID(playlistId, accessToken, fields = null, nextPage = null) {
    // make a request to the spotify api to get the playlist
    const url = nextPage || `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=0&limit=100`;
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {},
    };
    if (fields) {
      options.params.fields = fields;
    }
    // console.log("options: ", { url, ...options });

    try {
      const response = await makeRequest(url, options);
      // check for next page in response and recursively get the next page
      if (response.data.items && response.data.next) {
        // get the next page but parse out fields query param, leaving page and offset in place
        const nextPageData = await getPlaylistTracksByID(playlistId, accessToken, null, getNextPageUrl(response.data.next));
        // merge the next page with the current page
        response.data.items = [...response.data.items, ...nextPageData.items];
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("error getting playlist by id: ", error.response.status, error.response.data);
        throw error;
      } else {
        console.error("error getting playlist by id: ", error.message);
        throw error;
      }
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

function getNextPageUrl(url) {
  const parsedUrl = new URL(url);
  // parse out fields query param, leaving page and offset in place
  const nextUrl = parsedUrl.origin + parsedUrl.pathname + `?offset=${parsedUrl.searchParams.get("offset")}&limit=${parsedUrl.searchParams.get("limit")}`;
  // console.log("nextUrl: ", nextUrl);
  return nextUrl;
}

async function makeRequest(url, options) {
  return await axios.get(url, options);
}

module.exports = { getPlaylistArtists };
