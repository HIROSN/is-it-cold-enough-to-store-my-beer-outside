'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;

require('../index');
chai.use(chaihttp);

describe('REST API tests', function() {
  it('should return 500 for post /api with empty json', function(done) {
    chai.request(server)
    .post('/api')
    .send({})
    .end(function(err, res) {
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should return 500 for post /api without data', function(done) {
    chai.request(server)
    .post('/api')
    .end(function(err, res) {
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should return 500 for post /api', function(done) {
    chai.request(server)
    .post('/api')
    .send({ip: '8.8.8.8'})
    .end(function(err, res) {
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should return 500 for get /api without query', function(done) {
    chai.request(server)
    .get('/api')
    .end(function(err, res) {
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });
});
