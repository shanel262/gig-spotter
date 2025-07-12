const auth = require("./auth");
const axios = require("axios");

// search for events by artist name
async function searchEventsByArtist(artistName, nextPage = null) {
    console.log("artistName: ", artistName);
    // get the api key
    const apiKey = auth.getAccessToken();
    console.log("apiKey: ", apiKey);
    let url = nextPage || `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${artistName}&size=200&sort=date,asc`;
    // make a request to the ticketmaster api
    try {
        const response = await axios.get(url);
        // check for next page in response
        if (response.data._links && response.data._links.next) {
            // get the next page
            const nextPageData = await searchEventsByArtist(artistName, response.data._links.next.href);
            // merge the next page with the current page
            response.data._embedded.events = [...response.data._embedded.events, ...nextPageData._embedded.events];
        }
        return response.data._embedded.events;
    } catch (error) {
        console.error("error getting events: ", error);
        return [];
    }
}

module.exports = { searchEventsByArtist };
