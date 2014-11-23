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
    wind: req.current_observation.wind_string,
    precip: req.current_observation.precip_today_in,
    icon: req.current_observation.icon_url
  };

  if (req.isp) {
    json.ip = req.isp.query;
    json.isp = req.isp.isp;
  }

  if (req.query.callback) { return res.jsonp(json); }
  res.json(json);
};

module.exports = api;
