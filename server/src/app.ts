import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import { ClientsRouter } from './routes/clients.routes'
import path from 'path';

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.set("port", process.env.SERVER_POSRT);
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.resolve('uploads')))

/** loading routes */
ClientsRouter(app);


export default app;