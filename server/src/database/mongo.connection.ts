import mongoose from 'mongoose'

import connectionString from '../config/mongo.config'


(async () => {
    try {
        const db = await mongoose.connect(connectionString);
        console.log("DataBase Connection : ", db.connection.name)
    } catch (error) {
        console.log("Error al conectar a la base de datos --> ", error)
    }
})()