import { join, relative } from 'path';
import { readdirSync, existsSync } from 'fs';
import { Sequelize } from 'sequelize';
import { Server as SocketServer } from 'socket.io';
// import { loggerOnlyGlobal } from 'src/logs';

// const logger = loggerOnlyGlobal(__filename);
const topFolder = 'src';

export function expressModule() {
	function getModulePath(module) {
		return join(process.env.MODULES_PATH, module);
	}
	function getModules() {
		return readdirSync(process.env.MODULES_PATH, { withFileTypes: true })
			.filter((dir) => dir.isDirectory())
			.map((dir) => dir.name);
	}
	function getActiveModules() {
		return readdirSync(process.env.MODULES_PATH, { withFileTypes: true })
			.filter((dir) => dir.isDirectory())
			.map((dir) => dir.name)
			.filter(async (name) => await moduleIsActive(getModulePath(name)));
	}
	async function moduleIsActive(modulePath) {
		const index = await import(getRelativePath(join(modulePath, 'settings')));
		return index.isActive;
	}

	function addExpressRouterToApp(app, router) {
		app.use(`/${router.routeName}`, router.routes);
	}

	function getServerConnection(httpServer, options) {
		return new SocketServer(httpServer, {
			cors: {
				origin: options.allowOrigins,
			},
		});
	}
	function getDatabaseConfig() {
		return {
			development: {
				username: process.env.DATABASE_USER,
				password: `${process.env.DATABASE_PASSWORD}`,
				database: process.env.DATABASE_NAME,
				host: process.env.DATABASE_HOST,
				port: Number(process.env.DATABASE_PORT),
				dialect: 'postgres',
			},
		};
	}

	function getDatabaseConnection(username) {
		const config = getDatabaseConfig().development;
		if (process.env.DATABASE_URL)
			return new Sequelize(process.env.DATABASE_URL, {
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				},
				dialect: 'postgres',
				logging: false,
			});
		else
			return new Sequelize(
				config.database,
				username ? username : config.username,
				config.password,
				{
					host: config.host,
					port: config.port,
					dialect: config.dialect,
					logging: false,
				}
			);
	}

	async function checkDatabaseConnection(sequelizeConnection) {
		try {
			await sequelizeConnection.authenticate();
			console.log('Connection has been established successfully');
		} catch (error) {
			console.error('Unable to connect to the database: %o', error);
		}
	}
	return {
		getInstanceOfModule,
		getModulePath,
		getModules,
		getActiveModules,
		addExpressRouterToApp,
		getServerConnection,
		getDatabaseConfig,
		getDatabaseConnection,
		checkDatabaseConnection,
	};

	function getInstanceOfModule(module) {
		const modulePath = join(process.env.MODULES_PATH, module);

		// const cronPath = join(modulePath, 'cron');
		const modelsPath = join(modulePath, 'models');
		// const workersPath = join(modulePath, 'workers');
		const expressRoutesPath = join(modulePath, 'routes');

		// const haveCrons = existsSync(cronPath);
		const haveModels = existsSync(modelsPath);
		// const haveWorkers = existsSync(workersPath);
		const haveExpressRoutes = existsSync(expressRoutesPath);

		async function getExpressRoutes() {
			return await import(getRelativePath(join(expressRoutesPath)));
		}

		// async function getWorkers() {
		// 	return await import(getRelativePath(workersPath));
		// }

		// async function startCronSchedule() {
		// 	await import(getRelativePath(cronPath));
		// }

		return {
			modulePath,
			// cronPath,
			modelsPath,
			// workersPath: workersPath,
			expressRoutesPath,
			// haveCrons,
			haveModels,
			// haveWorkers,
			haveExpressRoutes,
			getExpressRoutes,
			// getWorkers,
			// startCronSchedule,
		};
	}

	function getRelativePath(path) {
		return '../' + relative(topFolder, path);
	}
}
