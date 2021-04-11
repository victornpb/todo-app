require('dotenv-safe').config();

// Use testing server for integration tests
// if (process.env.STAGING)
//   process.env.MONGODB_URI = '';

require('./src/server');