require("dotenv").config();
const axios = require("axios");

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
  if (!client_id || !client_secret) {
    throw new Error("client_id or client_secret is not set");
  }
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials'
  };

//   console.log("client_id: ", client_id);
//   console.log("client_secret: ", client_secret);
//   console.log("authOptions: ", authOptions);

  try {
    const response = await axios(authOptions);
    // console.log("access token: ", response.data);
    return response.data.access_token;
  } catch (error) {
    console.error("error getting access token: ", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getAccessToken };
