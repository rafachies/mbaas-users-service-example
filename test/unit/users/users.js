'use strict';

var expect = require('chai').expect
  , sinon = require('sinon')
  , supertest = require('supertest')
  , proxyquire = require('proxyquire');

describe(__filename, function () {
  var dbStub, request;

  beforeEach(function () {
    dbStub = sinon.stub();

    var app = require('express')();
    var usersRouter = proxyquire('lib/users', {
      'fh-mbaas-api': {
        db: dbStub
      }
    });
    app.use('/users', usersRouter);
    request = supertest(app);
  });

  describe('GET /users', function () {
    it('should return a list of users', function (done) {
      dbStub.yields(null, {
        count: 2,
        list: [{}, {}]
      });

      request.get('/users')
        .expect(200)
        .end(function (err, res) {
          expect(err).to.not.exist;
          expect(res.body.list).to.have.length(2);
          done();
        });
    });
  });
});
