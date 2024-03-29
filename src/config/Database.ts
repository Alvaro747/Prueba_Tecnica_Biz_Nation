import {Sequelize} from "sequelize";
import IDatabase from "@/interfaces/database/database.interface";
import ConfigEnviroments from "./database-enviroments.config";

class Database {
  private static instance: Database;
  private sequelize: Sequelize;

  private constructor(config: IDatabase) {
    this.sequelize = new Sequelize(
      config.dbName,
      config.dbUser,
      config.dbPassword,
      {
        host: config.dbHost,
        dialect: config.dbDialect,
        port: config.dbPort,
      }
    );
    this.getConnection();
  }

  private async getConnection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public static getInstance(): Database {
    const configEnviroment = ConfigEnviroments.getInstance().getConfig();
    if (!Database.instance) {
      Database.instance = new Database(configEnviroment);
    }
    return Database.instance;
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}

export default Database;
