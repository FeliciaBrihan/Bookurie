export async function initDatabaseModels(sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);
}

async function addModels(sequelize) {
	const { getModelProduct } = await import(
		'../modules/product/models/index.js'
	);
	getModelProduct(sequelize);
	await sequelize.sync();
}
async function addModuleProperties() {
	// TODO
}

async function addDefaultData() {
	// TODO
}
