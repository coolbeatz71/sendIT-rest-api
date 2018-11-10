'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _authMiddleware = require('../authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * route to sign-in the user to its account
 * @method POST
 */


// importing models
router.post('/signIn', function (request, response) {
  // get sign data from the request body
  var _request$body = request.body,
      email = _request$body.email,
      password = _request$body.password;


  if (!email || !password) {
    response.status(401).json({
      error: true,
      emptyParams: true
    });
  } else {
    var user = new _user2.default();
    var userInfo = user.getUser(email, password);

    if (userInfo) {
      response.status(200).json({
        error: false,
        data: userInfo
      });
    } else {
      response.status(401).json({
        error: true,
        errorWrongParams: true
      });
    }
  }
});

/**
 * route to sign-up the user to its account
 * @method POST
 */
router.post('/signUp', function (request, response) {
  var _request$body2 = request.body,
      firstName = _request$body2.firstName,
      lastName = _request$body2.lastName,
      email = _request$body2.email,
      password = _request$body2.password;


  if (!firstName || !lastName || !email || !password) {
    response.status(401).json({
      error: true,
      emptyParams: true
    });
  } else {
    var user = new _user2.default();
    var signUp = user.createUser(firstName, lastName, email, password);

    if (!signUp) {
      response.status(401).json({
        error: true,
        userExist: true
      });
    } else {
      response.status(201).json({
        error: false,
        data: signUp
      });
    }
  }
});

/**
 * route to fetch all parcels delivery orders by a specific user
 * @method GET
 */
router.get('/:userId/parcels', _authMiddleware2.default, function (request, response) {
  var userId = request.params.userId;


  var parcel = new _parcel2.default();
  var getParcel = parcel.getAllParcelByUser(userId);

  response.status(200).json({
    error: false,
    data: getParcel
  });
});

module.exports = router;