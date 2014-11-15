'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var WunderApi = require('wunderground-api-client').WunderApi;

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.post('/api', function(req, res) {
  var combined = new WunderApi(process.env.APIKEY,
    {lang: 'EN'}, 'geolookup', 'conditions');

  var query = req.body.Latitude + ',' + req.body.Longitude;

  combined.query(query).then(function(result) {
    if (!result.current_observation) { return res.status(500).json({}); }
    var tempf = result.current_observation.temp_f;
    var yesNo = (tempf <= process.env.TEMPF) ? 'YES' : 'NO';
    res.json({yesNo: yesNo});
  }).done();
});

app.listen(app.get('port'));
