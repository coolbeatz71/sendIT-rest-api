import express from 'express';

const router = express.Router();

/**
 * route to sign-in the user to its account
 * @method POST
 */
router.post('/signIn', (request, response) => {
  response.status(200).json({
    message: 'post request to /admin/signIn',
  });
});

module.exports = router;
