import { Models } from '../interface';
import { expressModule } from '../core/expressModule';
import { initDatabaseModels } from '../init/initDatabaseModels';

export async function getDatabaseModels() {
	const { getDatabaseConnection } = expressModule();
	const db = getDatabaseConnection();

	await initDatabaseModels(db);
	return db.models as unknown as Models;
}
