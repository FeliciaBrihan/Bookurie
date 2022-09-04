import { sequelize } from '../global.js';
import { getDatabaseModels } from '../helpers/dbTests.js';

export async function initDatabaseModels(sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	// await addDefaultData(sequelize);
}

async function addModels(sequelize) {
	const { getModelProduct } = await import(
		'../modules/product/models/index.js'
	);
	getModelProduct(sequelize);

	await sequelize.sync();
}
async function addModuleProperties() {}

export async function addDefaultData(sequelize) {
	// called from the server file after initDatabaseModels
	console.log('test');
	const { Product } = await getDatabaseModels();
	const products = await Product.findAll();
	if (products.length < 4) {
		await Product.bulkCreate([
			{
				name: 'onion',
				price: 7,
			},
			{
				name: 'chocolate',
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
