const request = require("request");

const geocode = (adress, callback) => {
  // encode ser till att det blir en valid URL i sökningen, t ex "?" gör inte så att det krashar
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1IjoibXVtbWEiLCJhIjoiY2swcXU0ZHFrMDF1ZDNucjM2cTBvZnY3ciJ9.0OJnBB-5Qd5G48qn3FPn2Q&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // Error and data
      callback("Unable to connet to location", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode