const errors = {
  VALIDATION_ERROR: 400,
  NOT_FOUND_ERROR: 404,
  SERVER_ERROR: 500,
  MONGO_DUPLICATE_KEY_ERROR: 11000,
  SALT_ROUNDS: 10,
  SECRET_KEY: 'my-secret-key',
};

module.exports = errors;
