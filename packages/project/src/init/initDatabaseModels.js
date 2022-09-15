import md5 from 'md5';

export async function initDatabaseModels(sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);
}

async function addModels(sequelize) {
	const { getModelLoan } = await import('../modules/loan/models/index.js');

	const { getModelBook } = await import('../modules/book/models/index.js');

	// will be deleted
	const { getModelProduct } = await import(
		'../modules/product/models/index.js'
	);
	const { getModelUser } = await import('../modules/user/models/index.js');

	getModelProduct(sequelize);
	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);

	const { Book, User, Loan } = sequelize.models;

	Book.belongsToMany(User, { through: Loan });

	await sequelize.sync();
}
async function addModuleProperties() {}

async function addDefaultData(sequelize) {
	const { User } = sequelize.models;
	const users = await User.findAll();
	if (users.length === 0) {
		await User.create({
			firstName: 'admin',
			lastName: 'admin',
			username: 'admin',
			email: 'admin@gmail.com',
			role: 'admin',
			password: md5('password123'),
		});
	}
}
