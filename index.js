'use strict';

var express = require('express');
var bodyparser = require('body-parser');

var geo = require('./lib/geo');
var isp = require('./lib/isp');
var weather = require('./lib/weather');
var api = require('./api.js');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.get('/api', [isp, weather], api);
app.post('/api', [geo, weather], api);

app.listen(app.get('port'));
