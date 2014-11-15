'use strict';

$(function() {
  var getLocation = function(done) {
    var dfd = $.Deferred();

    $.ajax({
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      url: 'http://ip-api.com/json',
      dataType: 'jsonp',
      success: dfd.resolve,
      error: dfd.reject
    });

    dfd.promise().then(function(results) {
      done(results.lat, results.lon);
    });
  };

  getLocation(function(lat, lon) {
    var dfd = $.Deferred();

    var data = {
      Latitude: lat,
      Longitude: lon
    };

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
      $('div').
        hide().
        text(results.yesNo).
        slideDown('fast');
    });
  });
});
