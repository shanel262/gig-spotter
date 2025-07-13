const axios = require("axios");

// get a ticketmaster api key
function getAccessToken() {
    // get the api key from the environment variables
    const consumerKey = process.env.TICKETMASTER_CONSUMER_KEY;
    if (!consumerKey) {
        throw new Error("TICKETMASTER_CONSUMER_KEY is not set");
    }

    return consumerKey;
}

module.exports = { getAccessToken };
