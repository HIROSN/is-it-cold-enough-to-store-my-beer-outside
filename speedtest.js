'use strict';

var fs = require('fs');

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

  var textFile = __dirname + '/test_' + req.params.sizeKbs +
    new Date().getTime() + Math.floor(Math.random() * 1000) + '.txt';

  fs.writeFile(textFile, genData(+req.params.sizeKbs), function(err) {
    if (err) { return res.status(500).send(); }

    res.set({
      'x-Date': new Date().getTime(),
      'x-SizeKbs': req.params.sizeKbs
    });

    var rs = fs.createReadStream(textFile);
    rs.pipe(res);
    rs.on('end', function() { fs.unlink(textFile); });
  });
};

module.exports = speedtest;
