// importing models
import Admin from '../models/admin';

/**
 * Middleware for the admin
 */
const checkAuthAdmin = (request, response, next) => {
  if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
    response.status(401).json({
      error: true,
      authKeyMissed: true,
    });
  } else {
    // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
    const authKey = request.headers.authorization.split(' ')[1];

    // verify the authKey
    const admin = new Admin();
    const isTokenValid = admin.isTokenValid(authKey);

    if (!isTokenValid) {
      response.status(401).json({
        error: true,
        authKeyInvalid: true,
      });
    } else {
      next();
    }
  }
};

module.exports = checkAuthAdmin;
