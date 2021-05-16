const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Command line argument without yargs
const address = process.argv[2] // gets the thrid element of the object
console.log(process.argv)

// Early exit if no address providet
if(!address){
   return console.log('Please provide an address!')
}

geocode(address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      // return is gonna stop function execution after printing error message 
        console.log(error)
    }else{
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
        })
    }     
})

