//  core module
const http = require('http');
const url = `http://api.weatherstack.com/current?access_key=607a8a82e7f868fef57f89a47719df8d&query=${45},${-75}&units=m`;

const request = http.request(url, (response) => {
    let data = ''
    response.on('data', (chunk) => {
        //console.log(chunk) // buffer
        data = data + chunk.toString()
    })
    response.on('end', ()=>{
        // console.log(data)
        const body = JSON.parse(data)
        console.log(body)
    })
})


request.on('error', (error) => {
    console.log('An error', error)
})

request.end()