import express from 'express';

// importing models
import User from '../models/user';
import Parcel from '../models/parcel';
import checkAuth from '../authMiddleware';

const router = express.Router();

/**
 * route to sign-in the user to its account
 * @method POST
 */
router.post('/signIn', (request, response) => {
  // get sign data from the request body
  const { email, password } = request.body;


  if (!email || !password) {
    response.status(401).json({
      error: true,
      emptyParams: true,
    });
  } else {
    const user = new User();
    const userInfo = user.getUser(email, password);

    if (userInfo) {
      response.status(200).json({
        error: false,
        data: userInfo,
      });
    } else {
      response.status(401).json({
        error: true,
        message: 'No user found with these credentials',
      });
    }
  }
});

/**
 * route to sign-up the user to its account
 * @method POST
 */
router.post('/signUp', (request, response) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = request.body;

  if (!firstName || !lastName || !email || !password) {
    response.status(401).json({
      error: true,
      emptyParams: true,
    });
  } else {
    const user = new User();
    const signUp = user.createUser(firstName, lastName, email, password);

    if (!signUp) {
      response.status(401).json({
        error: true,
        userExist: true,
      });
    } else {
      response.status(201).json({
        error: false,
        data: signUp,
      });
    }
  }
});

/**
 * route to fetch all parcels delivery orders by a specific user
 * @method GET
 */
router.get('/:userId/parcels', checkAuth, (request, response) => {
  const { userId } = request.params;

  const parcel = new Parcel();
  const getParcel = parcel.getAllParcelByUser(userId);

  response.status(200).json({
    error: false,
    data: getParcel,
  });
});

module.exports = router;
