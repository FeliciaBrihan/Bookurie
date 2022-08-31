import { expressModule } from '../core/expressModule.js';
import { sequelize, setSequelize } from '../global.js';

export async function initDatabase() {
	const { getDatabaseConnection, checkDatabaseConnection } = expressModule();

	const sequelizeInstance = getDatabaseConnection();
	setSequelize(sequelizeInstance);
	await checkDatabaseConnection(sequelize);
}
