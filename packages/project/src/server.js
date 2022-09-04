import './env.js';

import { createServer } from 'http';
import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import cors from 'cors';
import { initDatabase } from './init/initDatabase.js';
import {
	initDatabaseModels,
	addDefaultData,
} from './init/initDatabaseModels.js';
import { initDatabaseMigration } from './init/initDatabaseMigration.js';
import { initSocketServer } from './init/initSocketServer.js';
import { initExpressModules } from './init/initExpressModules.js';
// import { sequelize } from './global.js';
import { Sequelize } from 'sequelize';
import { loggerOnlyGlobal } from './logs/index.js';

//did not work 'initDatabaseModels(sequelize)' without initializing here the connection to db
const sequelize = new Sequelize(
	process.env.DATABASE_NAME,
	process.env.DATABASE_USER,
	process.env.DATABASE_PASSWORD,
	{
		dialect: 'postgres',
	}
);
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);

export default async function server() {
	const logger = loggerOnlyGlobal(__filename);

	const app = express();
	const httpServer = createServer(app);
	app.use(cors());

	// app.use('/docs', swaggerUi.serve, async (req, res) => {
	// 	return res.send(
	// 		swaggerUi.generateHTML(await import('../swagger/swagger.json'))
	// 	);
	// });
	app.get('/', function (req, res) {
		res.send('API');
	});

	app.use(json());

	await initDatabase();
	// initDatabaseMigration();
	initSocketServer(httpServer);
	initExpressModules(app);

	initDatabaseModels(sequelize);
	addDefaultData();

	if (process.env.ENVIRONMENT !== 'TEST') {
		httpServer.listen(process.env.PORT, () => {
			logger.info(`Server started on server: ${process.env.DOMAIN}`);
		});
		return httpServer;
	}
}

server();
