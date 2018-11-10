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
router.get('/', _authMiddleware2.default, function (request, response) {
  var parcel = new _parcel2.default();
  var getParcel = parcel.getAllParcel();

  response.status(200).json({
    error: false,
    data: getParcel
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


  var parcel = new _parcel2.default();
  var getParcel = parcel.getParcelById(parcelId);

  if (getParcel) {
    response.status(404).json({
      error: true,
      errorWrongId: true
    });
  } else {
    response.status(200).json({
      error: false,
      data: getParcel
    });
  }
});

/**
 * routes for editing the destination of a parcel
 * @method PUT
 */
router.put('/:parcelId/destination', function (request, response) {
  var parcelId = request.params.parcelId;
  var destination = request.body.destination;


  var user = new _user2.default();

  //get the AuthKey from the header to help retrieving the userId 
  var authKey = request.headers.authorization.split(' ')[1];

  //get the userId
  var userId = user.getUserIdByToken(authKey);

  var editDestination = user.editparcelDestination(userId, parcelId, destination);

  if (!editDestination) {
    response.status(401).json({
      error: true,
      errorEdit: true
    });
  } else {
    response.status(200).json({
      error: false,
      data: editDestination
    });
  }
});

router.put('/:parcelId/cancel', function (request, response) {
  var parcelId = request.params.parcelId;


  var user = new _user2.default();

  //get the AuthKey from the header to help retrieving the userId 
  var authKey = request.headers.authorization.split(' ')[1];

  //get the userId
  var userId = user.getUserIdByToken(authKey);

  var cancel = user.cancelParcel(userId, parcelId);

  if (!cancel) {
    response.status(401).json({
      error: true,
      errorCancel: true
    });
  } else {
    response.status(200).json({
      error: false,
      data: cancel
    });
  }
});

module.exports = router;