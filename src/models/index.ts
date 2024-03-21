import fs from "fs";
import {Sequelize, DataTypes} from "sequelize";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db: any = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js") ||
      file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    if (file.startsWith("index.")) {
      return;
    }
    const model = require(path.join(__dirname, file)).default;
    const modelInstance = model(sequelize, DataTypes);
    db[modelInstance.name] = modelInstance;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
