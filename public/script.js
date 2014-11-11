'use strict';

$(function() {
  if (!navigator.geolocation) { return; }

  navigator.geolocation.getCurrentPosition(function(position) {
    var dfd = $.Deferred();

    var data = {
      Latitude: position.coords.latitude,
      Longitude: position.coords.longitude
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
      $('div').text(results.yesNo);
    });
  });
});
