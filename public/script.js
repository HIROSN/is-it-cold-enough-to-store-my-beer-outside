'use strict';

$(function() {
  var getIPaddress = function(done) {
    var dfd = $.Deferred();

    $.ajax({
      contentType: 'application/json; charset=utf-8',
      url: 'https://freegeoip.net/json/',
      dataType: 'jsonp',
      success: dfd.resolve,
      error: dfd.reject
    });

    dfd.promise().then(function(results) {
      done(results.ip);
    });
  };

  var getWeather = function(done) {
    getIPaddress(function(ip) {
      var dfd = $.Deferred();
      var data = {ip: ip};

      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        url: '/api',
        dataType: 'json',
        success: dfd.resolve,
        error: dfd.reject
      });

      dfd.promise().then(function(results) {
        $('#yesNo').
          hide().
          text(results.yesNo).
          slideDown('fast', function() {
            $('#tempf').text(results.tempf + '°F');
            $('#city').text(results.city);
            $('#ip').text(results.ip);
            $('#isp').text(results.isp);
            $('.info').slideDown('fast');
          });
        done();
      });
    });
  };

  var speedTest = function(done) {
    var stepKbs = 1024;
    var maxItr = 5;

    var itr = maxItr;
    var msecTotal = 0;
    var msecPrev;

    var downloadTest = function(sizeKbs) {
      var dfd = $.Deferred();

      var xhr = $.ajax({
        contentType: 'text/plain; charset=utf-8',
        url: '/speedtest/' + sizeKbs,
        dataType: 'text',
        success: dfd.resolve,
        error: dfd.reject
      });

      dfd.promise().then(function() {
        var msec = new Date().getTime() - +xhr.getResponseHeader('x-Date');
        if (msecPrev) { msecTotal += msec - msecPrev; }
        msecPrev = msec;

        if (itr > 0 && (itr > (maxItr - 2) || msecTotal < 11000)) {
          --itr;
          return downloadTest(sizeKbs + stepKbs);
        }

        var err = (msecTotal <= 0);
        var mbpsDown = !err && (stepKbs * 8 / (msecTotal / maxItr));
        done(err, mbpsDown);
      }).fail(function(err) {
        done(err);
      });
    };

    downloadTest(stepKbs);
  };

  getWeather(function() {
    speedTest(function(err, mbpsDown) {
      if (err) { return; }
      $('#down').text(mbpsDown.toFixed(1) + 'Mbps (down)');
    });
  });
});
