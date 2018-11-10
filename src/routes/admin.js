import express from 'express';

// importing models
import Admin from '../models/admin';
import checkAuthAdmin from '../middleware/admin';

const router = express.Router();

/**
 * route to sign-in the admin to its account
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
    const admin = new Admin();
    const adminInfo = admin.getAdmin(email, password);

    if (adminInfo) {
      response.status(200).json({
        error: false,
        data: adminInfo,
      });
    } else {
      response.status(401).json({
        error: true,
        errorWrongParams: true,
      });
    }
  }
});

/**
 * admin route to edit parcel delivery order (presentLocation, status)
 * @method POST
 */
router.put('/parcels/:parcelId/edit', checkAuthAdmin, (request, response) => {
  const { parcelId } = request.params;

  // get body params
  const { presentLocation, status } = request.body;

  const admin = new Admin();
  const editParcel = admin.editParcel(parcelId, { presentLocation, status });

  if (!editParcel) {
    response.status(401).json({
      error: true,
      errorEdit: true,
    });
  } else {
    response.status(200).json({
      error: false,
      data: editParcel,
    });
  }
});

module.exports = router;
