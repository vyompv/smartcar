var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('smart-car', function() {

    describe('GET /vehicles/door', function() {

      it('should return an object of length 4', function(done) {
        request(server)
          .get('/vehicles/1234/doors')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.be.instanceof(Object).and.have.lengthOf(4);
            done();
          });
      });

    });

  });

});
