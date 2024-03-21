import { SequelizeDialectType } from "../../types/sequelize-dialect.type";

export default interface IDatabase {
    dbName: string;
    dbUser: string;
    dbPassword: string;
    dbHost: string;
    dbPort: number;
    dbDialect: SequelizeDialectType;
}