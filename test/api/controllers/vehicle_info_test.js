var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('smart-car', function() {

    describe('GET /vehicles/1234', function() {

      it('should return info about vehicles', function(done) {
        request(server)
          .get('/vehicles/1234')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.vin.should.be.ok;
            res.body.color.should.be.ok;
            res.body.doorCount.should.be.ok;
            res.body.driverTrain.should.be.ok;
            done();
          });
      });

    });

  });

});
