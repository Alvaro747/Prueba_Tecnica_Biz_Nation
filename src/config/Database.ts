import {Sequelize} from 'sequelize';

class Database {
    private static instance: Database;

    private constructor() {
        new Sequelize('database', 'username', 'password', {
            host: 'localhost',
            dialect: 'mysql'
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export default Database;