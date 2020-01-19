const env = {
  dev: 'dev',
  test: 'test',
  stg: 'stg',
  product: 'product',
};
const API_URL = {
  dev: 'http://45.32.114.97:8445/',
  test: 'http://45.32.114.97:8445/',
  stg: 'http://45.32.114.97:8445/',
  product: 'http://45.32.114.97:8445/',
};

const currentEnv = env.dev;

export const BASE_API_URL = API_URL[currentEnv];
