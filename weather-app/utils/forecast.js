const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=607a8a82e7f868fef57f89a47719df8d&query=${latitude},${longitude}&units=m`;
    
    request({ url, json: true }, (error, response) => {
    if(error){
        callback('Unable to connect to weather service!', undefined)
    } else if(response.body.error){
        callback('Unable to find location!', '')
    } else{
        const { temperature, feelslike, weather_descriptions} = response.body.current
        callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
    }
}) 
}

module.exports = forecast