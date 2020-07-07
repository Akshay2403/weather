const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtzaGF5MjQwMyIsImEiOiJja2F4dHllcTgwOXFzMnBvMnpvMWxuenBrIn0.oeiN4-lYKRPUz3Ed4S6VYg&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Cant connect to the  mapbox network service!!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find loation in  mapbox!! try another location', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode