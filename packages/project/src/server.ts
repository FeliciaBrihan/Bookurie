import 'src/env';
import { createServer } from 'http';
import express, { json, Response, Request } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import {
	initDatabase,
	// initDatabaseMigration,
	initSocketServer,
	initExpressModules,
	initDatabaseModels,
} from 'src/init';

import { sequelize } from 'src/global';
import { loggerOnlyGlobal } from 'src/logs';

export default async function server() {
	const logger = loggerOnlyGlobal(__filename);

	const app = express();
	const httpServer = createServer(app);
	app.use(cors());

	app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
		return res.send(
			swaggerUi.generateHTML(await import('../swagger/swagger.json'))
		);
	});

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
