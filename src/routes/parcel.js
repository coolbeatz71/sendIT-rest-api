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
router.get('/', checkAuth, (request, response) => {
  const parcel = new Parcel();
  const getParcel = parcel.getAllParcel();

  response.status(200).json({
    error: false,
    data: getParcel,
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

  if (!parcelName || !description || !pickupLocation || !destination || !weight) {
    response.status(401).json({
      error: true,
      paramsMissed: true,
    });
  } else {
    const parcel = new Parcel();
    const createParcel = parcel.createParcel(
      userId, parcelName, description, pickupLocation, destination, weight,
      );

    response.status(200).json({
      error: false,
      data: createParcel,
    });
  }
});

/**
 * route to fetch a specific delivery order by its ID
 * @method GET
 */
router.get('/:parcelId', (request, response) => {
  const { parcelId } = request.params;

  const parcel = new Parcel();
  const getParcel = parcel.getParcelById(parcelId);

  if(!getParcel){
    response.status(404).json({
      error: true,
      errorWrongId: true,
    });
  }else{
    response.status(200).json({
      error: false,
      data: getParcel,
    });
  }
});

module.exports = router;
