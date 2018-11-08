'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

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
        message: 'No user found with these credentials'
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

module.exports = router;