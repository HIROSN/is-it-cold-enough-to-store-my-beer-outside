'use strict';

var geo = function(req, res, next) {
  if (!req.body.lat || !req.body.lon) { return next(); }
  req.location = req.body;
  next();
};

module.exports = geo;
