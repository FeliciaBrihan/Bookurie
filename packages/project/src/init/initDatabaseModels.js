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

	const { getModelRole } = await import('../modules/role/models/index.js');

	const { getModelPermission } = await import(
		'../modules/permission/models/index.js'
	);

	getModelProduct(sequelize);
	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);
	getModelRole(sequelize);
	getModelPermission(sequelize);

	const { Book, User, Loan, Role, Permission } = sequelize.models;

	Book.belongsToMany(User, { through: Loan });

	Role.hasMany(User, { foreignKey: 'roleId' });
	User.belongsTo(Role, { foreignKey: 'roleId' });

	Role.hasMany(Permission);
	Permission.belongsToMany(Role, { through: 'rolePermissions' });

	await sequelize.sync({ force: true });
}
async function addModuleProperties() {}

async function addDefaultData(sequelize) {
	const { Role } = sequelize.models;
	const roles = await Role.findAll();
	if (roles.length === 0) {
		await Role.bulkCreate([
			{
				name: 'user',
			},
			{
				name: 'super admin',
			},
			{
				name: 'admin',
			},
			{
				name: 'staff',
			},
			{
				name: 'moderator',
			},
		]);
	}
	const { Permission } = sequelize.models;
	const permissions = await Permission.findAll();
	if (permissions.length === 0) {
		await Permission.bulkCreate([
			{
				name: 'delete',
			},
			{
				name: 'read',
			},
			{
				name: 'create',
			},
			{
				name: 'update',
			},
		]);
	}
	const { User } = sequelize.models;
	const users = await User.findAll();
	if (users.length === 0) {
		await User.create({
			firstName: 'admin',
			lastName: 'admin',
			username: 'admin',
			email: 'admin@gmail.com',
			role: 'admin',
			roleId: 3,
			password: md5('password123'),
		});
	}
}
