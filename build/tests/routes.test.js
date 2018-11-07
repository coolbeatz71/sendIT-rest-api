'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();

var apiVersion = '/api/v1';

_chai2.default.use(_chaiHttp2.default);

describe('/GET parcels', function () {
  it('it should GET all the parcels', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels').end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});