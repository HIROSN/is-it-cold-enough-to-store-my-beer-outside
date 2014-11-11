'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;

require('../index');
chai.use(chaihttp);

describe('REST API tests', function() {
  it('should return 500 for post /api with empty json', function(done) {
    chai.request(server).
    post('/api').
    send({}).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should return 404 for get /api with valid data', function(done) {
    chai.request(server).
    get('/api').
    send({Latitude: 47.6, Longitude: 122.3}).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(404);
      done();
    });
  });
});
