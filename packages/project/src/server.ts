import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import { createServer } from 'http';
import express, { json, Response, Request } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import multer from 'multer';

import {
	initDatabase,
	// initDatabaseMigration,
	initSocketServer,
	initExpressModules,
	initDatabaseModels,
} from 'src/init';

import { sequelize } from 'src/global';
import { loggerOnlyGlobal } from 'src/logs';
import { authorization } from 'src/middleware/authorization';

export default async function server() {
	const logger = loggerOnlyGlobal(__filename);

	const app = express();
	const httpServer = createServer(app);
	app.use(cors());
	app.use(authorization);

	app.use('/docs', swaggerUi.serve, async (req: Request, res: Response) => {
		return res.send(
			swaggerUi.generateHTML(await import('../swagger/swagger.json'))
		);
	});

	app.get('/', function (req: Request, res: Response) {
		res.send('API');
	});

	app.use(json());

	const storageEngine = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, '../frontend/src/assets/images/e-commerce');
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname);
		},
	});

	const upload = multer({ storage: storageEngine });

	app.post('/upload', upload.single('file'), (req, res) => {
		if (req.file) {
			res.send({ 'File uploaded successfully': req.file });
		} else {
			res.status(400).send('Please upload a valid image');
		}
	});

	await initDatabase();
	// initDatabaseMigration();
	initSocketServer(httpServer);
	initExpressModules(app);

	initDatabaseModels(sequelize);

	if (process.env.ENVIRONMENT !== 'TEST') {
		httpServer.listen(process.env.PORT, () => {
			logger.info(`Server started on: ${process.env.DOMAIN}`);
		});
		return httpServer;
	}
}

server();
