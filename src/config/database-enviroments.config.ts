import IDatabase from "@/interfaces/database/database.interface";
import { SequelizeDialectType } from "@/types/sequelize-dialect.type";

class ConfigEnviroment  {
    private static instance: ConfigEnviroment;
    private readonly config: IDatabase;

    private constructor() {
        this.config = this.loadConfig();
    }

    public static getInstance(): ConfigEnviroment {
        if (!ConfigEnviroment.instance) {
            ConfigEnviroment.instance = new ConfigEnviroment();
        }
        return ConfigEnviroment.instance;
    }

    private loadConfig(): IDatabase {
        const {
            DB_NAME,
            DB_USER,
            DB_PASSWORD,
            DB_HOST,
            DB_PORT,
            DB_DIALECT
        } = process.env;

        // Check if all environment variables are set
        if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_DIALECT) {
            throw new Error("Missing required environment variables for database configuration.");
        }

        // Check if the database dialect is valid
        if (!['mysql', 'sqlite', 'postgres', 'mssql'].includes(DB_DIALECT)) {
            throw new Error(`Invalid database dialect: ${DB_DIALECT}`);
        }

        return {
            dbName: DB_NAME,
            dbUser: DB_USER,
            dbPassword: DB_PASSWORD,
            dbHost: DB_HOST,
            dbPort: parseInt(DB_PORT),
            dbDialect: DB_DIALECT as SequelizeDialectType
        };
    }

    public getConfig(): IDatabase {
        return this.config;
    }
}

export default ConfigEnviroment;