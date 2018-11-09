import express from 'express';

// importing models
import Parcel from '../models/parcel';
import User from '../models/user';
import checkAuth from '../authMiddleware';

const router = express.Router();

/**
 * route to fetch all parcels delivery orders
 * @method GET
 */
router.get('/', (request, response) => {
  response.status(200).json({
    message: 'get request to /parcels',
  });
});

/**
 * route to create a parcel delivery order
 * @method POST
 */
router.post('/', checkAuth, (request, response) => {
  // get sign data from the request body
  const {
    parcelName, description, pickupLocation, destination, weight,
  } = request.body;

  // We should get the userId using the authKey in the header
  const authKey = request.headers.authorization.split(' ')[1];

  const user = new User();
  const userId = user.getUserIdByToken(authKey);
  console.log(userId);
});

/**
 * route to fetch a specific delivery order by its ID
 * @method GET
 */
router.get('/:parcelId', (request, response) => {
  const { parcelId } = request.params;
  response.status(200).json({
    message: 'get request to /parcels for an individual parcel order',
    parcelId,
  });
});

module.exports = router;
