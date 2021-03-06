'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _admin3 = require('../middleware/admin');

var _admin4 = _interopRequireDefault(_admin3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing models
var router = _express2.default.Router();

/**
 * route to sign-in the admin to its account
 * @method POST
 */
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
    var admin = new _admin2.default();
    var adminInfo = admin.getAdmin(email, password);

    if (adminInfo) {
      response.status(200).json({
        error: false,
        data: adminInfo
      });
    } else {
      response.status(401).json({
        error: true,
        wrongParams: true
      });
    }
  }
});

/**
 * admin route to edit parcel delivery order (presentLocation, status)
 * @method POST
 */
router.put('/parcels/:parcelId/edit', _admin4.default, function (request, response) {
  var parcelId = request.params.parcelId;

  // get body params

  var _request$body2 = request.body,
      presentLocation = _request$body2.presentLocation,
      status = _request$body2.status;


  var admin = new _admin2.default();
  var editParcel = admin.editParcel(parcelId, { presentLocation: presentLocation, status: status });

  if (!editParcel) {
    response.status(401).json({
      error: true,
      errorEdit: true
    });
  } else {
    response.status(200).json({
      error: false,
      data: editParcel
    });
  }
});

/**
 * TESTED
 * route to get the number of parcels delivery orders for all users
 * @method GET
 */
router.get('/parcels/count', _admin4.default, function (request, response) {
  var delivered = 'delivered';
  var inTransit = 'in transit';
  var cancelled = 'cancelled';

  var admin = new _admin2.default();
  var all = admin.getParcelNumber();
  var parcelDelivered = admin.getParcelNumber(delivered);
  var parcelInTransit = admin.getParcelNumber(inTransit);
  var parcelCancelled = admin.getParcelNumber(cancelled);

  response.status(200).json({
    error: false,
    data: {
      all: all,
      delivered: parcelDelivered,
      inTransit: parcelInTransit,
      cancelled: parcelCancelled
    }
  });
});

module.exports = router;