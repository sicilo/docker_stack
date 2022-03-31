import dotenv from 'dotenv'
dotenv.config();
dotenv.config({ path: `./src/env/.env.${process.env.ENVIRONMENT}` });


import app from './app'
import mysql_db from './database/mysql.connection';

import './database/mongo.connection'

mysql_db.sync().then(() => {
    console.log('Sequelize sintronizó con: ', mysql_db.getDatabaseName());
    app.listen(app.get("port"), () => console.log("listen on port " + app.get("port")));
}).catch(err => {
    console.log('Error al sincronizar')
    console.log(err)
})