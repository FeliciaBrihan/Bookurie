import { expressModule } from '../core/expressModule.js';
import { initDatabaseModels } from '../init/initDatabaseModels.js';

export async function getDatabaseModels() {
	const { getDatabaseConnection } = expressModule();
	const db = getDatabaseConnection();

	await initDatabaseModels(db);
	return db.models;
}
