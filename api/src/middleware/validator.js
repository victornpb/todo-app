const Schema = require('validate');

/**
 * Helper used for validating payload agains a schema
 * @param {Object} schema The schema to validate.
 * @param {Object} data The data that will be validated.
 * @returns Returns an error object or null
 */
function validate(schema, req, res, next) {
  const data = req.body;
  const schemaObj = new Schema(schema);

  const errors = schemaObj.validate(data);

  if (errors && errors.length) {
    res.status(422).json(_mapErrorfromValidate(errors));
  } else {
    return next();
  }
}

/**
 * @private
 * @description Maps the errors object from the 'validate' library to an Error Response object that will be returned from the API.
 * @param {Object} errors The errors object from the 'validate' library.
 */
function _mapErrorfromValidate(errors) {
  return {
    code: 'VALIDATION_ERROR',
    message: 'Malformated request',
    details: errors.map((error) => ({
      message: error.message,
      path: error.path,
    })),
  };
}

module.exports = function newSchemaValidator(schema) {
  return function schemaValidatorMiddleware(req, res, next) {
    return validate(schema, req, res, next);
  };
};
