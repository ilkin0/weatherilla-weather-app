const request = require('request')



const getWeather = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/b0854aec02e1655c7203e05c7d77dfd1/' + latitude + ',' + longitude + '/?units=si'

    request({
        url: url,
        json: true
    }, (error, {
        body /* "response " evezine response object icindeki "body" birbasa daxil edirem function-a*/
    }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location'.undefined)
        } else {
            callback(undefined,
                'It is currently ' + body.currently.temperature + '°C out in ' + body.timezone + '. ' + body.daily.data[0].summary + ' There is a ' + (body.currently.precipProbability * 100) + '% chance of rain.'
            )
        }
    })

}

module.exports = getWeather