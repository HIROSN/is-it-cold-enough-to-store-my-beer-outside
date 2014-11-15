'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var request = require('superagent');
var WunderApi = require('wunderground-api-client').WunderApi;

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.post('/api', function(req, res) {
  request.get('http://ip-api.com/json/' + req.body.ip).
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

        var location = result.location.city + ', ' +
        result.location.state + ' ' +
        result.location.country_name;

        res.json({
          yesNo: yesNo,
          tempf: tempf,
          location: location
        });

      }).done();
    });
});

app.listen(app.get('port'));
