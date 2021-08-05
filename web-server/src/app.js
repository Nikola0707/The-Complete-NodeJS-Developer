const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  // the first argument is the name of the view to render (index)
  // and the second is an object which contains all values that will be rendered
  res.render("index", {
    title: "Weather",
    name: "Nikola Ristoski",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nikola Ristoski",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is some hepfull message",
    name: "Nikola Ristoski",
  });
});

// The Query string
app.get("/weather", (req, res) => {
  //http://localhost:3000/weather?address=skopje
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  //{ latitude, longitude, location } = {}
  // = {} Setting up default object, when we destructure an object, the code 
  // works whether or not an object is ever passed
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        // return is gonna stop function execution after printing error message
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  //http://localhost:3000/products?search=games&rating=5
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  res.send({
    products: [],
  });
});

// Single not found route hendler
app.get("/help/*", (rew, res) => {
  res.render("404", {
    title: "404",
    name: "Nikola Ristoski",
    errorMessage: "Help article not found",
  });
});

// Route handler 404 page
// if route not found
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nikola Ristoski",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
