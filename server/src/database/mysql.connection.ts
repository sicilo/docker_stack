import { Sequelize } from 'sequelize';
import config from '../config/mysql.config'

const db = new Sequelize(config);

export default db;



// export const db = mysql.createConnection(config);

// db.connect(err => {
//     if (err)
//         console.log('error connect: ' + err.stack);

//     console.log('connection as id: ' + db.threadId);
// });

