'use strict';

$(function() {
  if (!navigator.geolocation) { return; }
  var $yesNo = $('#yesNo');

  navigator.geolocation.getCurrentPosition(function(position) {
    var dfd = $.Deferred();

    var data = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
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
      $yesNo.text(results.yesNo).
        addClass('animated tada').
        one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd ' +
          'oanimationend animationend', function() {
            $yesNo.removeClass('animated tada');
            $('#tempf').text(results.tempf + '°F');
            $('#city').text(results.city);
            $('.info').slideDown('fast');
          }
        );
    });
  });

  $yesNo.on('mouseenter', function() {
    $yesNo.addClass('animated rubberBand');
  });

  $yesNo.on('mouseleave', function() {
    $yesNo.removeClass('animated rubberBand');
  });

  $yesNo.on('click', function() {
    $yesNo.removeClass('animated rubberBand');
    $yesNo.addClass('animated rollOut');
  });
});
