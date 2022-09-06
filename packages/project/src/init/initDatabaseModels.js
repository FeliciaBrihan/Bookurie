export async function initDatabaseModels(sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);
}

async function addModels(sequelize) {
	const { getModelProduct } = await import(
		'../modules/product/models/index.js'
	);
	const { getModelUser } = await import('../modules/user/models/index.js');
	getModelProduct(sequelize);
	getModelUser(sequelize);

	await sequelize.sync();
}
async function addModuleProperties() {}

async function addDefaultData(sequelize) {
	const { Product } = sequelize.models
	const products = await Product.findAll();
	if (products.length < 5) {
		await Product.bulkCreate([
			{
				name: 'milk',
				price: 7,
			},
			{
				name: 'peanuts',
				price: 8,
			},
			{
				name: 'ice cream',
				price: 15,
			},
			{
				name: 'oil',
				price: 15,
			},
		]);
	}
}
