import { DataTypes, Model, Optional } from 'sequelize'
import db from '../database/mysql.connection'

interface IClientsAttributes {
    id: number,
    name: string,
    surname: string,
    identificationType: string,
    identification: string,
    age: number,
    birthplace: string
};

interface IClientsCreationAttributes
    extends Optional<IClientsAttributes, 'id'> { }

interface ClientsInstance
    extends Model<IClientsAttributes, IClientsCreationAttributes>,
    IClientsAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Clients = db.define<ClientsInstance>('Clients', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    surname: {
        type: DataTypes.STRING,
    },
    identificationType: {
        type: DataTypes.STRING,
    },
    identification: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    birthplace: {
        type: DataTypes.STRING,
    }
});

export default Clients;