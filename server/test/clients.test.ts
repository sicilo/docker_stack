import dotenv from 'dotenv'
dotenv.config();
dotenv.config({ path: `./src/env/.env.${process.env.ENVIRONMENT}` });
import supertest from 'supertest'
import app from '../src/app'
import '../src/database/mongo.connection'
import mysql from '../src/database/mysql.connection'
import { Clients } from '../src/controllers/clients.controller'
let server: any;

beforeEach(async () => {
    mysql.sync().then(() => {
        server = app.listen(app.get("port"));
    }).catch(err => {
        console.log('Error al sincronizar')
        console.log(err)
    })
})

afterEach(async () => {
    mysql.close();
    server.close()
})

describe('clients controller', () => {
    it('get clients', async () => {
        const get_request = await supertest(app).get('/clients');
        expect(get_request.status).toBe(200);
        expect(get_request.body).toBeInstanceOf(Array)
    });

    it('post clients', async () => {
        const post_request = await supertest(app).post('/clients').send({
            name: "Alexandros",
            surname: "Mougran",
            identificationType: "cedula",
            identification: "1036665991",
            age: 56,
            birthplace: "villa dorada",
            img: "data-base64"
        });
        expect(post_request.status).toBe(200);
        expect(post_request.body).toBeInstanceOf(Array)
    });
})

