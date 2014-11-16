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

  it('should return 500 for post /api without data', function(done) {
    chai.request(server).
    post('/api').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should work for post /api with Google Public DNS IP', function(done) {
    chai.request(server).
    post('/api').
    send({ip: '8.8.8.8'}).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.isp).to.equal('Google');
      expect(res.body.city).to.equal('Mountain View, CA USA');
      done();
    });
  });

  it('should return 500 for get /api without query', function(done) {
    chai.request(server).
    get('/api').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should work for get /api with Google Public DNS IP', function(done) {
    chai.request(server).
    get('/api?ip=8.8.8.8').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.isp).to.equal('Google');
      expect(res.body.city).to.equal('Mountain View, CA USA');
      done();
    });
  });

  it('should be able to handle a JSONP GET request', function(done) {
    chai.request(server).
    get('/api?ip=8.8.8.8&callback=callback').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.text.match(/callback\(\{.*\}\)/i)).is.not.equal(null);
      var json = JSON.parse(res.text.match(/\{.*\}/i)[0]);
      expect(json.isp).to.equal('Google');
      expect(json.city).to.equal('Mountain View, CA USA');
      done();
    });
  });
});
