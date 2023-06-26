import * as sequelize from 'sequelize';
import config from '../config';

export const dbConfig = new sequelize.Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
    port: +config.DB_PORT,
    pool: {
      min: 0,
      max: 10,
      acquire: 30000,
      idle: 10000,
    },
    // eslint-disable-next-line no-console
    logging: config.NODE_ENV == 'production' ? false : console.log,
  },
);

const connectDB = async () => {
  try {
    dbConfig
      .authenticate()
      .then(() => console.info('PostgreSQL Connected...'))
      .catch((err) => {
        console.error(err.message);
      });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
