const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_WORK_FACTOR = 10;
const JWT_PRIVATE_KEY = String(process.env.JWT_PRIVATE_KEY).replace(/\\n/gm, '\n');
const TOKEN_EXPIRATION = '1d';




module.exports = {
  /**
   * Creates a hash from a plain text password
   * @param  {string} password Plain text password
   * @return {string} Hashed password
   */
  async hashPassword(password) {
    return await bcrypt.hash(password, SALT_WORK_FACTOR);
  },

  /**
   * Test a password against a hash
   * @param  {string} hash     A hashed passoword
   * @param  {string} password A plain text passoword
   * @return {boolean} True when the password matches
   */
  async testPassword(hash, password) {
    return await bcrypt.compare(password, hash);
  },

  /**
   * @function {function name}
   * @param  {type} userId {description}
   * @return {type} {description}
   */
  async createToken(userId) {

    // promisified sign function
    function jwtSign(payload, secret, options) {
      return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => err ? reject(err) : resolve(token));
      });
    }

    const payload = { userId: userId };

    return await jwtSign(payload, JWT_PRIVATE_KEY, {
      // algorithm: 'RS256',
      expiresIn: TOKEN_EXPIRATION,
    });  
  },

  /**
   * Test if a token is valid and returns the token payload
   * @param  {string} token A token
   * @return {userId|null} The userId or null if the token is invalid
   */
  async testToken(token) {
    // promisified sign function
    function jwtVerify(token, secret) {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => err ? reject(err) : resolve(payload));
      });
    }
    return await jwtVerify(token, JWT_PRIVATE_KEY);
  },
};
