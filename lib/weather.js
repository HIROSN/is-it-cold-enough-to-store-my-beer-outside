'use strict';

var WunderApi = require('wunderground-api-client').WunderApi;

var weather = function(req, res, next) {
  if (!req.location) { return next(); }

  var combined = new WunderApi(process.env.APIKEY,
    {lang: 'EN'}, 'geolookup', 'conditions');

  var query = req.location.lat + ',' + req.location.lon;

  combined.query(query).then(function(data) {
    if (!data.current_observation || !data.location) {
      return res.status(500).json({});
    }

    req.current_observation = data.current_observation;
    req.location = data.location;
  }).
  done(function() {
    next();
  });
};

module.exports = weather;
