'use strict';

var fs = require('fs');
var textFile = __dirname + '/test.txt';

var genData = function(sizeKbs) {
  var data = [];
  var oneKb = 512;

  for (var i = oneKb * sizeKbs - 1; i >= 0; i--) {
    data.push('a');
  }
  return data;
};

var speedtest = function(req, res) {
  if (!req.params) { return res.status(500).send(); }

  fs.writeFile(textFile, genData(+req.params.sizeKbs), function(err) {
    if (err) { return res.status(500).send(); }

    res.set({
      'x-Date': new Date().getTime(),
      'x-SizeKbs': req.params.sizeKbs
    });

    fs.createReadStream(textFile).pipe(res);
  });
};

module.exports = speedtest;
