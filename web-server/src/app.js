const path = require('path')
const express = require('express');

// console.log(__dirname) // returns the path to the directory where this script lives in
// console.log(__filename) // retirns the path to the file itself
// console.log(path.join(__dirname, '../public'))

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');


// Rendering static index.html file
// For access use htttp:localhost:3000/help.html
// For access use htttp:localhost:3000/about.html

//view engine tells Express which extension to associate with the template when call res.render()
//npm i hbs (handlebars template)
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // render allow to render a dynamic view like hbs
    // from view folder
    // the first argument is the name of the view to render (index)
    // and the second is an object which contains all values that will be rendered
    res.render('index', {
        title: "Weather app",
        name: "Nikola Ristoski"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Nikola Ristoski"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message:"This is help message"
    })
})

app.get('/weather',(req, res) => {
    res.send({
        forecast: 'It is snowing',
        location:   'Skopje'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})