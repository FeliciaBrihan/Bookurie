import { Models } from 'src/interface';
import { expressModule } from 'src/core';
import { initDatabaseModels } from 'src/init';

export async function getDatabaseModels() {
	const { getDatabaseConnection } = expressModule();
	const db = getDatabaseConnection();

	await initDatabaseModels(db);
	return db.models as unknown as Models;
}
