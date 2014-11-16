'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var request = require('superagent');
var WunderApi = require('wunderground-api-client').WunderApi;

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

var api = function(req, res) {
  var ip = req.body.ip || req.query.ip;
  if (!ip) { return res.status(500).json({}); }

  request.get('http://ip-api.com/json/' + ip).
    end(function(err, data) {
      if (err || !data) { return res.status(500).json({}); }
      var location = JSON.parse(data.text);

      var combined = new WunderApi(process.env.APIKEY,
        {lang: 'EN'}, 'geolookup', 'conditions');

      var query = location.lat + ',' + location.lon;

      combined.query(query).then(function(result) {
        if (!result.current_observation || !result.location) {
          return res.status(500).json({});
        }

        var tempf = result.current_observation.temp_f;
        var yesNo = (tempf <= process.env.TEMPF) ? 'YES' : 'NO';

        var city = result.location.city + ', ' +
          result.location.state + ' ' +
          result.location.country_name;

        var json = {
          yesNo: yesNo,
          tempf: tempf,
          city: city,
          ip: location.query,
          isp: location.isp
        };

        if (req.query.callback) { return res.jsonp(json); }
        res.json(json);
      }).done();
    });
};

app.get('/api', api);
app.post('/api', api);
app.listen(app.get('port'));
