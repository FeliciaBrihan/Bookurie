import { expressModule } from '../core/expressModule';
import { sequelize, setSequelize } from '../global';

export async function initDatabase() {
	const { getDatabaseConnection, checkDatabaseConnection } = expressModule();

	const sequelizeInstance = getDatabaseConnection();
	setSequelize(sequelizeInstance);
	await checkDatabaseConnection(sequelize);
}
