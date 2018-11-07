import express from 'express';

const router = express.Router();

/**
 * route to sign-in the user to its account
 * @method POST
 */
router.post('/signIn', (request, response, next) => {
  response.status(200).json({
    message: 'post request to /user/signIn',
  });

  next();
});

/**
 * route to sign-up the user to its account
 * @method POST
 */
router.post('/signUp', (request, response, next) => {
  response.status(200).json({
    message: 'post request to /user/signUp',
  });

  next();
});

module.exports = router;
