'use strict';

var request = require('superagent');

var isp = function(req, res, next) {
  var ip = req.body.ip || req.query.ip;
  if (!ip) { return next(); }

  request.get('http://ip-api.com/json/' + ip).end(function(err, data) {
    if (err || !data) { return res.status(500).json({}); }
    req.isp = JSON.parse(data.text);
    req.location = {lat: req.isp.lat, lon: req.isp.lon};
    next();
  });
};

module.exports = isp;
