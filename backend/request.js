const axios = require("axios");

// Helper to sleep for ms milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function request(url, maxRetries = 3) {
    // make a request to the ticketmaster api
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (maxRetries === 0) {
            console.error("error making request: ", error);
            return null;
        }
        if (error.response && error.response.status === 429) {
            console.warn("Received 429 from Ticketmaster. Backing off for 5 seconds...");
            await sleep(5000);
            console.warn("Retrying...");
            return await request(url, maxRetries - 1);
        }
        console.error("error making request: ", error);
        return null;
    }
}

module.exports = { request };
