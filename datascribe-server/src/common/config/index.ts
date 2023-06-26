import dotenv from 'dotenv';
if (!dotenv) throw new Error('Unable to use dot env lib');

const envFound = dotenv.config();
// This error should crash whole process
if (!envFound) throw new Error("⚠️ Couldn't find .env file ⚠️");

export default {
  ENV: process.env.ENV,
  NODE_ENV: process.env.NODE_ENV,
  NAME: process.env.NAME,
  VERSION: process.env.VERSION,

  PORT: parseInt(process.env.PORT, 10),

  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,

  JWT_SECRET: process.env.JWT_SECRET,
  CIPHER_SECRET: process.env.CIPHER_SECRET,
  JWT_TTL: process.env.JWT_TTL,

  /* API configs */
  API_PREFIX: '/',
};
