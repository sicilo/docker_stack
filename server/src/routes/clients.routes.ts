import { Application, Request, Response } from 'express'
import multer from '../libs/multer'
import agreementController from '../controllers/clients.controller'


export const ClientsRouter = (app: Application): void => {
    app
        .get("/clients", agreementController.getClients)
        .post("/clients", agreementController.createClient)
        .put("/clients", agreementController.updateClient)
        .delete("/clients/:id", agreementController.deleteClient)
}