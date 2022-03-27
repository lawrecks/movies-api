import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';

const { PORT, NODE_ENV, JWT_SECRET } = process.env;

// Define required environmental variables
const requiredEnvs = ['JWT_SECRET', 'OMDB_API_KEY'];

// Throw error if required variable is not defined
requiredEnvs.forEach((item) => {
  if (!process.env[item]) {
    throw new Error(`${item} is not set in the environmental variables`);
  }
});

const currentEnv = {
  development,
  test,
  production,
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  NODE_ENV,
  JWT_SECRET,
};
