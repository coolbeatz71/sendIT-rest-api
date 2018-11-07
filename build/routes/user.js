'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * route to sign-in the user to its account
 * @method POST
 */
router.post('/signIn', function (request, response, next) {
  response.status(200).json({
    message: 'post request to /user/signIn'
  });

  next();
});

/**
 * route to sign-up the user to its account
 * @method POST
 */
router.post('/signUp', function (request, response, next) {
  response.status(200).json({
    message: 'post request to /user/signUp'
  });

  next();
});

module.exports = router;