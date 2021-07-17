const path = require("path");
const express = require("express");
const hbs = require("hbs");

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
    title: "Weather app",
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
    name: "Nikola Ristoski"
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Skopje",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
