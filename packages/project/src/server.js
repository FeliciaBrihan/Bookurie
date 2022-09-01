import './env.js';

import { createServer } from 'http';
import express, { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import cors from 'cors';
import { initDatabase } from './init/initDatabase.js';
import { initDatabaseModels } from './init/initDatabaseModels.js';
import { initSocketServer } from './init/initSocketServer.js';
import { initExpressModules } from './init/initExpressModules.js';
import { sequelize } from './global.js';
import { loggerOnlyGlobal } from './logs/index.js';

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

	// initDatabaseModels(sequelize);

	if (process.env.ENVIRONMENT !== 'TEST') {
		httpServer.listen(process.env.PORT, () => {
			logger.info(`Server started on server: ${process.env.DOMAIN}`);
		});
		return httpServer;
	}
}

server();
