import './env.ts';
import { createServer } from 'http';
import express, { json, Response, Request } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger/swagger.json';
import cors from 'cors';

import {
	initDatabase,
	// initDatabaseMigration,
	initSocketServer,
	initExpressModules,
	initDatabaseModels,
} from './init/index';

import { sequelize } from './global';
import { loggerOnlyGlobal } from './logs';

export default async function server() {
	const logger = loggerOnlyGlobal(__filename);

	const app = express();
	const httpServer = createServer(app);
	app.use(cors());

	// app.use('/docs', swaggerUi.serve, async (req, res) => {
	// 	return res.send(
	// 		swaggerUi.generateHTML(
	// 			await import('../swagger/swagger.json', { assert: { type: 'json' } })
	// 		)
	// 	);
	// });

	app.use('/docs', swaggerUi.serve);
	app.use('/docs', swaggerUi.setup(swaggerDocs));

	app.get('/', function (req: Request, res: Response) {
		res.send('API');
	});

	app.use(json());

	await initDatabase();
	// initDatabaseMigration();
	initSocketServer(httpServer);
	initExpressModules(app);

	initDatabaseModels(sequelize);

	if (process.env.ENVIRONMENT !== 'TEST') {
		httpServer.listen(process.env.PORT, () => {
			logger.info(`Server started on server: ${process.env.DOMAIN}`);
		});
		return httpServer;
	}
}

server();