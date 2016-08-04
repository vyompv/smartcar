var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('smart-car', function() {

    describe('post /vehicles/1234/engine', function() {

      it('check whether parameter status is returned', function(done) {
        request(server)
          .post('/vehicles/1234/engine')
          .send({ action: 'start'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.status.should.be.ok;
            done();
          });
      });

      it('check whether parameter status is returned', function(done) {
        request(server)
          .post('/vehicles/1234/engine')
          .send({ action: 'stop'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.status.should.be.ok;
            done();
          });
      });

    });

  });

});
