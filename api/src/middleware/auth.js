const { testToken } = require('../auth');

/**
 * This middleware checks for the presence of a authorization header
 * and checks if the token is valid and injects the userId in the req.body
 */
async function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await testToken(token);
    if (token && payload) {
      // inject userId on
      req.body.userId = payload.userId;
      next();
    } else {
      throw 'Invalid Auth';
    }
  } catch (err) {
    res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'The token is invalid or is missing',
    });
  }
};

module.exports = authMiddleware;