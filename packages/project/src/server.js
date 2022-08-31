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
// import { loggerOnlyGlobal } from './logs'; //TBD

export default async function server() {
	// const logger = loggerOnlyGlobal(__filename);

	const app = express();
	const httpServer = createServer(app);
	app.use(cors());

	// app.use(
	// 	session({ secret: 'FCU^Ds98sh^', resave: true, saveUninitialized: true })
	// );

	// app.use('/docs', swaggerUi.serve, async (req, res) => {
	// 	return res.send(
	// 		swaggerUi.generateHTML(await import('../swagger/swagger.json'))
	// 	);
	// });
	app.use(json());

	await initDatabase();
	// initDatabaseMigration();
	initSocketServer(httpServer);
	// initExpressModules(app);

	// initDatabaseModels(sequelize);

	if (process.env.ENVIRONMENT !== 'TEST') {
		httpServer.listen(process.env.PORT, () => {
			console.log(`Server started on server: ${process.env.DOMAIN}`);
		});
		return httpServer;
	}
}

server();
