const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/d9c988993beab673f67f91d4ca1cc0d4/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback("Unable to connectto weather services", undefined)
    } else if (body.error) {
      callback("No location found.")
    } else {
      callback(undefined, {
        summery: body.currently.summary,
        temperature: body.currently.temperature,
        chanceOfRain: body.currently.precipProbability
      })
    }
  })
}

module.exports = forecast