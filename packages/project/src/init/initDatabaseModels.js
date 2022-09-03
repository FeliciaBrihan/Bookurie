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
async function addModuleProperties() {
	// TODO
}

// async function addDefaultData(sequelize) {
// 	console.log('test');
// 	const { Product } = await getDatabaseModels();

// 	await Product.bulkCreate([
// 		{
// 			name: 'milk',
// 			price: 7,
// 		},
// 		{
// 			name: 'eggs',
// 			price: 10,
// 		},
// 		{
// 			name: 'meat',
// 			price: 15,
// 		},
// 		{
// 			name: 'bread',
// 			price: 7,
// 		},
// 	]);
// }
