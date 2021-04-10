require('dotenv').config();

function checkEnvs(envs) {
  for (const env of envs) {
    if (!process.env[env]) {
      throw `Missing environment variable '${env}'!`;
    }
  }
}

checkEnvs([
  "API_PORT",
  "MONGODB_URI"
]);

// Use testing server for integration tests
// if (process.env.STAGING)
//   process.env.MONGODB_URI = '';

require('./server');