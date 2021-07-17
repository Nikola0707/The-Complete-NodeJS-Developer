const path = require('path')
const express = require('express');

// console.log(__dirname) // returns the path to the directory where this script lives in
// console.log(__filename) // retirns the path to the file itself
// console.log(path.join(__dirname, '../public'))

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

// Rendering static index.html file
// For access use htttp:localhost:3000
// For access use htttp:localhost:3000/help.html
// For access use htttp:localhost:3000/about.html
app.use(express.static(publicDirectoryPath))



app.get('/weather',(req, res) => {
    res.send({
        forecast: 'It is snowing',
        location:   'Skopje'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})