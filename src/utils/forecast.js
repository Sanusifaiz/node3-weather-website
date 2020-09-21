const request = require('request')
 



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=503cf931a50526b92cb4c6e66179eb1c&query=' + latitude + ',' + longitude + '&units=m'
    
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        }  else if (body.error) {
            callback('Location not found!!, Please try another search', undefined)
        }  else {
            callback(undefined, 'The weather is ' + body.current.temperature +' degrees'+ ' but it feels like ' + body.current.feelslike + ' degrees' + ' in ' + body.location.region + ', ' + body.location.country)
        }

    })
}

module.exports = forecast