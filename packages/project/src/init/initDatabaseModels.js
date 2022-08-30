import { Sequelize } from 'sequelize';

export async function initDatabaseModels(sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);

	async function addModels(sequelize) {
		// TODO
		await sequelize.sync();
	}
}

async function addModuleProperties() {
	// TODO
}

async function addDefaultData() {
	// TODO
}
