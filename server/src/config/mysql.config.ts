import { Options } from 'sequelize';

const connectionConfig: Options = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    dialect: "mysql"
};

export default connectionConfig;