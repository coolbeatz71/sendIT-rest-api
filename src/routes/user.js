import express from 'express';

// importing models
import User from '../models/user';

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

module.exports = router;
