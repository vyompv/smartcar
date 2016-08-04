var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('smart-car', function() {

    describe('GET /vehicles/1234/fuel and /vehicles/1234/battery', function() {

      it('should contain percent parameter', function(done) {
        request(server)
          .get('/vehicles/1234/fuel')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.percent.should.be.ok;
            done();
          });
      });

      it('should contain percent parameter', function(done) {
        request(server)
          .get('/vehicles/1234/battery')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.percent.should.be.ok;
            done();
          });
      });

    });

  });

});
