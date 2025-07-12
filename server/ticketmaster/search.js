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

function parseEvent(event) {
    console.log("event: ", event);
    return {
        name: event.name,
        info: event.info,
        date: event.dates.start.localDate, // this is wrong location
        link: event.url, // get link to buy tickets
        // get location
        venue: event.place ? event.place.name : null,
        city: event.place ? event.place.city.name : null,
        state: event.place ? event.place.state.name : null,
        country: event.place ? event.place.country.name : null,
        // get price
        priceMin: event.priceRanges ? event.priceRanges[0].min : null, // what about the rest of the list?
        priceMax: event.priceRanges ? event.priceRanges[0].max : null,
        // get image
        image: event.images[0].url,
    };
}

module.exports = { searchEventsByArtist, parseEvent };
