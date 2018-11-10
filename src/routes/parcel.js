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

  if(getParcel){
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

/**
 * routes for editing the destination of a parcel
 * @method PUT
 */
router.put('/:parcelId/destination', (request, response) => {
  const { parcelId } = request.params;
  const { destination } = request.body;

  const user = new User();
  
  //get the AuthKey from the header to help retrieving the userId 
  const authKey = request.headers.authorization.split(' ')[1];

  //get the userId
  const userId = user.getUserIdByToken(authKey);

  const editDestination = user.editparcelDestination(userId, parcelId, destination);

  if(!editDestination){
    response.status(401).json({
      error: true,
      errorEdit: true,
    });
  } else {
    response.status(200).json({
      error: false,
      data: editDestination,
    });
  }
});

router.put('/:parcelId/cancel', (request, response) => {
  const { parcelId } = request.params;

  const user = new User();
  
  //get the AuthKey from the header to help retrieving the userId 
  const authKey = request.headers.authorization.split(' ')[1];

  //get the userId
  const userId = user.getUserIdByToken(authKey);

  const cancel = user.cancelParcel(userId, parcelId);

  if(!cancel){
    response.status(401).json({
      error: true,
      errorCancel: true,
    });
  } else {
    response.status(200).json({
      error: false,
      data: cancel,
    });
  }
});

module.exports = router;
