const { request } = require("../request");
const auth = require("./auth");
const axios = require("axios");

// search for events by artist name
async function searchEventsByArtist(artistName, attractionId = null, nextPage = null) {
    // console.log("artistName: ", artistName);
    // get the api key
    const apiKey = auth.getAccessToken();
    // console.log("apiKey: ", apiKey);

    // should probably get the attraction id from the artist name and use that instead of the keyword
    let url;

    // Helper to build the Ticketmaster events URL
    const buildEventsUrl = (id) =>
        nextPage ||
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&attractionId=${id}&size=200&sort=date,asc&segmentName=Music`;

    if (attractionId) {
        url = buildEventsUrl(attractionId);
        // Optionally log the URL for debugging
        // console.log("Ticketmaster events URL:", url);
    } else {
        try {
            const fetchedAttractionId = await getAttractionId(artistName, apiKey);
            if (!fetchedAttractionId) {
                console.error(`No attraction id found for artist: ${artistName}`);
                return [];
            }
            url = buildEventsUrl(fetchedAttractionId);
            // Optionally log the URL for debugging
            // console.log("Ticketmaster events URL:", url);
        } catch (error) {
            console.error("Error getting attraction id:", error);
            return [];
        }
    }

    // Helper to sleep for ms milliseconds
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // TODO: put this in a reuasable function
    let response;
    while (true) {
        try {
            response = await request(url);
            break; // Success, exit loop
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.warn("Received 429 from Ticketmaster. Backing off for 5 seconds...");
                await sleep(5000);
                console.warn("Retrying...");
                continue; // Retry after backoff
            } else {
                console.error("error getting events: ", url, error);
                return [];
            }
        }
    }

    // NOTE: disabling this for now because it's not working, the host is missing from the next url
    // check for next page in response
    // if (response.data._links && response.data._links.next) {
    //     console.log("getting next page: ", response.data._links.next.href);
    //     // get the next page
    //     const nextPageData = await searchEventsByArtist(artistName, response.data._links.next.href);
    //     // merge the next page with the current page
    //     response.data._embedded.events = [
    //         ...(response.data._embedded ? response.data._embedded.events : []),
    //         ...(nextPageData && nextPageData._embedded ? nextPageData._embedded.events : [])
    //     ];
    // }
    return response && response._embedded ? response._embedded.events : [];
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

async function getAttractionId(artistName, apiKey) {
  // get the attraction id from the artist name
  try {
    const attractions = await request(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${apiKey}&keyword=${encodeURIComponent(artistName)}`
    );
    if (!attractions || !attractions._embedded || !attractions._embedded.attractions) {
      return null;
    }
    // loop through attractions and find the one that has the exact artist name in the name
    for (const attraction of attractions._embedded.attractions) {
      if (attraction.name.toLowerCase() === artistName.toLowerCase()) {
        console.log("attraction id: ", artistName, "->", attraction.id);
        return attraction.id;
      }
    }
    return null;
  } catch (error) {
    console.error("error getting attraction id: ", error);
    return null;
  }
}

module.exports = { searchEventsByArtist, parseEvent };
