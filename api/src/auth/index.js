const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_WORK_FACTOR = 10;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
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
    return bcrypt.compare(password, this.password);
  },

  /**
   * @function {function name}
   * @param  {type} userId {description}
   * @return {type} {description}
   */
  async createToken(userId) {
    const payload = { userId: userId };
    return await jwt.sign(payload, JWT_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: TOKEN_EXPIRATION,
    });
  },

  /**
   * Test if a token is valid and returns the token payload
   * @param  {string} token A token
   * @return {userId|null} The userId or null if the token is invalid
   */
  async testToken(token) {
    return; //TODO:
  },
};
