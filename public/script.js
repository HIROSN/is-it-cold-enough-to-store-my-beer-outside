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
    });
  });
});
