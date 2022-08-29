import './env';

import { createServer } from 'http';
import express, { json, Response, Request } from 'express';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import cors from 'cors';
import {} from './init'; //TBD
import { sequelize } from './global';
import { loggerOnlyGlobal } from './logs'; //TBD

export default async function server() {
	const logger = loggerOnlyGlobal(__filename);

	const app = express();
	const httpServer = createServer(app);
	app.use(cors());

	app.use(
		session({ secret: 'FCU^Ds98sh^', resave: true, saveUninitialized: true })
	); //from where do i get this secret key? which is the use of this middleware?

	app.use(json());

	// TBD inits when the init folder is done

	if (process.env.ENVIRONMENT !== 'TEST') {
		httpServer.listen(process.env.PORT, () => {
			logger.info;
			`Server started on server: ${process.env.DOMAIN}`;
		});
		return httpServer;
	}
}

server();
