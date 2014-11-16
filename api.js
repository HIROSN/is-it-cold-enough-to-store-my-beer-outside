'use strict';

var api = function(req, res) {
  if (!req.current_observation || !req.location) {
    return res.status(500).json({});
  }

  var tempf = req.current_observation.temp_f;
  var yesNo = (tempf <= process.env.TEMPF) ? 'YES' : 'NO';

  var city = req.location.city + ', ' +
    req.location.state + ' ' +
    req.location.country_name;

  var json = {
    yesNo: yesNo,
    tempf: tempf,
    city: city,
    ip: req.isp.query,
    isp: req.isp.isp
  };

  if (req.query.callback) { return res.jsonp(json); }
  res.json(json);
};

module.exports = api;
