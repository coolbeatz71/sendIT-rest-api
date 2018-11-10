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

// //////////////////////////
// Test for parcels routes //
// //////////////////////////

// get all parcel delivery orders
describe('## /GET parcels', function () {
  it('should GET all the parcels', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// test create parcel routes
describe('## /POST create new parcel delivery order', function () {
  it('should POST a new parcel', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/parcels').send({}).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// to fetch a specific delivery order by its ID
describe('## /GET parcels/:orderId', function () {
  it('should GET a specific delivery order by its ID', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/:orderId').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// for editing the destination of a parcel
describe('## /PUT parcels/:parcelId/destination', function () {
  it('should edit the destination of a parcel', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/:parcelId/destination').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// for cancelling a parcel delivery order
describe('## /PUT parcels/:parcelId/cancel', function () {
  it('should cancel a parcel delivery order', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/parcels/:parcelId/cancel').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// ///////////////////////////
// Test for users routes    //
// ///////////////////////////

// signUp the user when no data are sent
describe('/POST signUp user', function () {
  var signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    passwrord: ''
  };
  it('should POST user data (signUp)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/user/signUp').send(signUpData).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// signIn the user when no data are sent
describe('/POST signIn user', function () {
  var signInData = {
    email: '',
    passwrord: ''
  };
  it('should POST user data (signIn)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/user/signIn').send(signInData).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /:userId/parcels', function () {
  it('should fetch all parcel delivery order by an user', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/user/:userId/parcels').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/number', function () {
  it('should get the number for parcel delivery order per category', function (done) {
    _chai2.default.request(_app2.default).get(apiVersion + '/parcels/number').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// //////////////////////////
// Test for admin route    //
// //////////////////////////

// post admin data
describe('/POST signIn admin', function () {
  it('should POST admin data (signIn)', function (done) {
    _chai2.default.request(_app2.default).post(apiVersion + '/admin/signIn').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});

// admin edit parcel presentlocation and status
describe('/PUT admin/parcels/:parcelId/edit', function () {
  it('should Edit parcel presentLocation and status of a parcel delivery order', function (done) {
    _chai2.default.request(_app2.default).put(apiVersion + '/admin/parcels/:parcelId/edit').end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});