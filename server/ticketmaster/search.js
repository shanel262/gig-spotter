const auth = require("./auth");
const axios = require("axios");

// search for events by artist name
async function searchEventsByArtist(artistName, nextPage = null) {
    console.log("artistName: ", artistName);
    // get the api key
    const apiKey = auth.getAccessToken();
    // console.log("apiKey: ", apiKey);
    let url = nextPage || `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${artistName}&size=200&sort=date,asc`;

    // Helper to sleep for ms milliseconds
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let response;
    while (true) {
        try {
            response = await axios.get(url);
            break; // Success, exit loop
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn("Received 429 from Ticketmaster. Backing off for 5 seconds...");
                await sleep(5000);
                console.warn("Retrying...");
                continue; // Retry after backoff
            } else {
                console.error("error getting events: ", error);
                return [];
            }
        }
    }

    // check for next page in response
    if (response.data._links && response.data._links.next) {
        // get the next page
        const nextPageData = await searchEventsByArtist(artistName, response.data._links.next.href);
        // merge the next page with the current page
        response.data._embedded.events = [
            ...(response.data._embedded ? response.data._embedded.events : []),
            ...(nextPageData._embedded ? nextPageData._embedded.events : [])
        ];
    }
    return response.data._embedded ? response.data._embedded.events : [];
}

function parseEvent(event) {
    return {
        name: event.name,
        info: event.info,
        date: event.dates.start.localDate,
        time: event.dates.start.localTime,
        link: event.url,
        // get location
        venue: parseEventVenueInfo(event._embedded ? event._embedded.venues[0] : null),
        // get price
        priceMin: event.priceRanges ? event.priceRanges[0].min : null, // what about the rest of the list?
        priceMax: event.priceRanges ? event.priceRanges[0].max : null,
        // get image
        image: event.images[0].url,
    };
}

function parseEventVenueInfo(venue) {
    if (!venue) {
        return null;
    }
    let venueInfo = {
        name: venue.name,
        city: venue.city ? venue.city.name : null,
        state: venue.state ? venue.state.name : null,
        country: venue.country ? venue.country.name : null,
        postcode: venue.postalCode ? venue.postalCode : null,
    };
    return venueInfo;
}

module.exports = { searchEventsByArtist, parseEvent };
