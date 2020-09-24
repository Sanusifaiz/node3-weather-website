const request = require('request')
 const fs = require ('fs')



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=503cf931a50526b92cb4c6e66179eb1c&query=' + latitude + ',' + longitude + '&units=m'
    
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        }  else if (body.error) {
            callback('Location not found!!, Please try another search', undefined)
        }  else {
            
            
            const message = 'The weather is '+ body.current.temperature +' degrees'+ ' but it feels like ' + body.current.feelslike + ' degrees' + ' in ' + body.location.region + ', ' + body.location.country            
            
            callback(undefined, {
                forecastdata: message,
                forecasttime: body.current.observation_time + ', ' + body.current.weather_descriptions[0]   ,
                forecasthumidity: 'Current humidity = ' + body.current.humidity + '%',
                forecastwind: 'Wind Speed = ' + body.current.wind_speed + 'km/h'

                
            })
            
        }

    })
}

module.exports = forecast