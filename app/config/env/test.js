import 'dotenv/config';

export default {
  DATABASE_URL: process.env.DATABASE_TEST_URL,
  HOST: process.env.APP_HOST,
  API_VERSION: process.env.API_VERSION,
  AUTH_SERVICE_BASE_URL: process.env.AUTH_SERVICE_BASE_URL,
  OMDB_API_KEY: process.env.OMDB_API_KEY,
};
