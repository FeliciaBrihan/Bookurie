import { expressModule } from 'src/core';
import { sequelize, setSequelize } from 'src/global';

export async function initDatabase() {
	const { getDatabaseConnection, checkDatabaseConnection } = expressModule();

	const sequelizeInstance = getDatabaseConnection();
	setSequelize(sequelizeInstance);
	await checkDatabaseConnection(sequelize);
}
