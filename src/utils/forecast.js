const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=add91a19c000c3022a1684a71e0c08f5&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Cant connect to the waether network service!!', undefined);
        }
        else if (body.error) {
            callback('Unable to find loation in weather!!', undefined);
        }
        else {
            callback(undefined, `The condition of weather is ${body.current.weather_descriptions[0]}.The temprature is ${body.current.temperature} degree and it's feels like ${body.current.feelslike} degree.`)
        }
    })
}

module.exports = forecast