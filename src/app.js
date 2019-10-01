const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirPath = path.join(__dirname, "../public/");

// custom hbs path
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Martin Persson"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Martin Persson"
  });
});

// help template
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    msg: "Here you can get help about stuff",
    name: "Martin Persson"
  });
});

// weather app page
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must enter an address"
    });
  }
  // need to add default params when we destruct the obj
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    // input for forecast comes from geocode
    forecast(
      latitude,
      longitude,
      (error, { summery, temperature, chanceOfRain }) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          forecast: summery,
          degrees: temperature,
          location,
          address: req.query.address,
          chanceOfRain
        });
      }
    );
  });
});

/// test
app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: []
  });
});

// 404 page. måste komma sist. Eftersom express kolla igenom alla länkar från topp till botten * betyder allt som inte redan finns

// 404 specifikt för ariklar som inte hittas
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help article not found.",
    name: "Martin Persson"
  });
});

// 404 för allt annat
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found",
    name: "Martin Persson"
  });
});

// startar servern, specificerar vilken port samt en callback funktion som säger åt användaren att den körs
app.listen(5000, () => {
  console.log("The server is running");
});
