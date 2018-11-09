'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _authMiddleware = require('../authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * route to fetch all parcels delivery orders
 * @method GET
 */


// importing models
router.get('/', function (request, response) {
  response.status(200).json({
    message: 'get request to /parcels'
  });
});

/**
 * route to create a parcel delivery order
 * @method POST
 */
router.post('/', _authMiddleware2.default, function (request, response) {
  // get sign data from the request body
  var _request$body = request.body,
      parcelName = _request$body.parcelName,
      description = _request$body.description,
      pickupLocation = _request$body.pickupLocation,
      destination = _request$body.destination,
      weight = _request$body.weight;

  // We should get the userId using the authKey in the header

  var authKey = request.headers.authorization.split(' ')[1];

  var user = new _user2.default();
  var userId = user.getUserIdByToken(authKey);

  if (!parcelName || !description || !pickupLocation || !destination || !weight) {
    response.status(401).json({
      error: true,
      paramsMissed: true
    });
  } else {
    var parcel = new _parcel2.default();
    var createParcel = parcel.createParcel(userId, parcelName, description, pickupLocation, destination, weight);

    response.status(200).json({
      error: false,
      data: createParcel
    });
  }
});

/**
 * route to fetch a specific delivery order by its ID
 * @method GET
 */
router.get('/:parcelId', function (request, response) {
  var parcelId = request.params.parcelId;

  response.status(200).json({
    message: 'get request to /parcels for an individual parcel order',
    parcelId: parcelId
  });
});

module.exports = router;