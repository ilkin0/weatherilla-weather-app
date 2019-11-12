const request = require("request")

const getGeo = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWRyMCIsImEiOiJjazE3c2VrMHgwbHA3M2xtcmF1azM4cjdqIn0.RBzD7drM9IhjLc7XBxpw0A&limit=3'

    request({
        url: url,
        json: true
    }, (error, {
        body /* "response " evezine response object icindeki "body" birbasa daxil edirem function-a*/
    }) => {
        if (error) {
            callback('Unable to create connection with server', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeo