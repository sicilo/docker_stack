import { model, Schema, Document } from 'mongoose'

export interface IClient {
    identification: String,
    img: String
}

const client = new Schema({
    identification: {
        type: String,
        unique: true,
        required: true
    },
    img: {
        type: String,
        data: Buffer
    }
})

client.methods

export default model<IClient>('Client', client);