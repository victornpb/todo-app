const bcrypt = require('bcrypt');
const jwt = require('jwt');

const SALT_WORK_FACTOR = 10;

module.exports = {
    /**
     * Creates a hash from a plain text password
     * @param  {string} password Plain text password
     * @return {string} Hashed password
     */
    async hashPassword(password) {
        await bcrypt.hash(password, SALT_WORK_FACTOR);
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
        return; //TODO:
    },

    /**
     * @function {function name}
     * @param  {type} token {description}
     * @return {type} {description}
     */
    async testToken(token) {
        return; //TODO:
    }
};