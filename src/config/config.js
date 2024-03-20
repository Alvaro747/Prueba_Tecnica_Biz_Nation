const dotenv = require("dotenv");

// get the path of the environment file
const getEnvFile = (path) => {
  switch (path) {
    case "development":
      return ".env.development";
    case "production":
      return ".env";
    default:
      return ".env";
  }
};

const pathEnviroment = getEnvFile(process.env.NODE_ENV);

// Loading environment variables
dotenv.config({
  path: pathEnviroment,
});

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT} =
  process.env;

let config = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: DB_DIALECT,
};

module.exports = {
  development: config,
  production: config,
};
