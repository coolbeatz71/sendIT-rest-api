import express from 'express';

const router = express.Router();

/**
 * route to fetch all parcels delivery orders
 * @method GET
 */
router.get('/', (request, response, next) => {
  response.status(200).json({
    message: 'get request to /parcels',
  });

  next();
});

/**
 * route to create a parcel delivery order
 * @method POST
 */
router.post('/', (request, response, next) => {
  response.status(200).json({
    message: 'post request to /parcels',
  });

  next();
});

/**
 * route to fetch a specific delivery order by its ID
 * @method GET
 */
router.get('/:parcelId', (request, response, next) => {
  const { parcelId } = request.params;
  response.status(200).json({
    message: 'get request to /parcels for an individual parcel order',
    parcelId,
  });

  next();
});

module.exports = router;
