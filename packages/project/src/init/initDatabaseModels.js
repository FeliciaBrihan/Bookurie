import md5 from 'md5';

export async function initDatabaseModels(sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);
}

async function addModels(sequelize) {
	const { getModelLoan } = await import('../modules/loan/models/index.js');

	const { getModelBook } = await import('../modules/book/models/index.js');

	const { getModelUser } = await import('../modules/user/models/index.js');

	const { getModelRole } = await import('../modules/role/models/index.js');

	const { getModelResource } = await import(
		'../modules/resource/models/index.js'
	);

	const { getModelPermission } = await import(
		'../modules/permission/models/index.js'
	);
	const { getModelRolePermission } = await import(
		'../modules/rolePermission/models/index.js'
	);

	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);
	getModelRole(sequelize);
	getModelResource(sequelize);
	getModelPermission(sequelize);
	getModelRolePermission(sequelize);

	const { Book, User, Loan, Role, Permission, Resource, RolePermission } =
		sequelize.models;

	Book.belongsToMany(User, { through: Loan });

	User.hasOne(Role, { foreignKey: 'user_id' });
	Role.belongsTo(User, { foreignKey: 'user_id' });

	Role.hasMany(Permission);
	Permission.belongsToMany(Role, { through: RolePermission });

	Resource.hasMany(RolePermission);
	RolePermission.belongsToMany(Resource, { through: 'ResourceRolePermission' });

	await sequelize.sync();
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

	const { Resource } = sequelize.models;
	const resources = await Resource.findAll();
	if (resources.length === 0) {
		await Resource.bulkCreate([
			{
				name: 'User',
			},
			{
				name: 'Book',
			},
			{
				name: 'Loan',
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
			role_id: 3,
			password: md5('password123'),
		});
	}
}
