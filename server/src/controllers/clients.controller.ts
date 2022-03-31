import { Request, Response } from "express";
import { Op } from 'sequelize'
import SqlClients from "../models/clients.mysql";
import MongoClients, { IClient } from '../models/clients.mongo'


export interface Clients {
    id?: number,
    name: string,
    surname: string,
    identificationType: string,
    identification: string,
    age: number,
    birthplace: string,
    img: String
};

interface IGetClients {
    identification?: string,
    age?: number,
}

export default {
    getClients: async (req: Request<{}, {}, IGetClients>, res: Response) => {
        const mysqlClients = await SqlClients.findAll(
            !!req.body.age ?
                {
                    where: {
                        age: {
                            [Op.gte]: req.body.age
                        }
                    }
                } : !!req.body.identification ? {
                    where: {
                        identification: {
                            [Op.eq]: req.body.identification
                        }
                    }
                } : {}
        );
        const mongoClients = await MongoClients.find();

        let result = mysqlClients.map(client => {
            let img = mongoClients.find(mc => mc.identification === client.identification)?.img;
            return ({
                id: client.id,
                name: client.name,
                surname: client.surname,
                identificationType: client.identificationType,
                identification: client.identification,
                age: client.age,
                birthplace: client.birthplace,
                img: img
            });
        })
        res.json(result);
    },
    createClient: async (req: Request<{}, {}, Clients>, res: Response) => {
        try {
            const { body } = req;

            let existClient = await SqlClients.findOne({
                where: {
                    identification: body.identification
                }
            });

            if (!!existClient)
                return res.json({ msg: 'este cliente ya existe' })

            const newMysqlClients = SqlClients.create({
                name: body.name,
                surname: body.surname,
                identificationType: body.identificationType,
                identification: body.identification,
                age: body.age,
                birthplace: body.birthplace
            });

            const newMongoClient: IClient = {
                identification: body.identification,
                img: body.img
            };

            MongoClients.create(newMongoClient, async (err, result) => {
                if (!!err)
                    return res.json(err);

                (await newMysqlClients).save().then(client => {
                    res.json({
                        id: client.id,
                        name: client.name,
                        surname: client.surname,
                        identificationType: client.identificationType,
                        identification: client.identification,
                        age: client.age,
                        birthplace: client.birthplace,
                        img: result.img
                    });
                }).catch(err => res.json(err))
            });
        } catch (err) {
            res.json(err);
        }
    },
    updateClient: async (req: Request<{}, {}, Clients>, res: Response) => {
        try {
            const { body } = req;

            const mysqlClient = await SqlClients.findByPk(req.body.id);

            if (!mysqlClient)
                return res.json({
                    msg: 'no se encuentra contrato con id: ' + req.body.id
                });

            MongoClients.findOneAndUpdate({ identification: body.identification }, { img: body.img }, { new: true }).then(updated => {
                mysqlClient.update(req.body).then(client => {
                    res.json({
                        id: client.id,
                        name: client.name,
                        surname: client.surname,
                        identificationType: client.identificationType,
                        identification: client.identification,
                        age: client.age,
                        birthplace: client.birthplace,
                        img: updated?.img
                    });
                });
            }).catch(err => res.json(err));


        } catch (err) {
            res.json(err);
        }
    },
    deleteClient: async (req: Request<{ id: number }>, res: Response) => {
        try {
            const { params } = req;

            const mysqlClient = await SqlClients.findByPk(params.id);

            if (!mysqlClient)
                return res.json({
                    msg: 'no se encuentra contrato con id: ' + params.id
                });

            MongoClients.findOneAndDelete({ identification: mysqlClient.identification })
                .then(() => {
                    SqlClients.destroy({
                        where: {
                            identification: mysqlClient.identification
                        }
                    }).then(() => {
                        res.json({ msg: "cliente eliminado" })
                    }).catch(err => res.json(err))
                })
                .catch(err => res.json(err))
        } catch (err) {
            res.json(err)
        }
    }
}