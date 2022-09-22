import md5 from 'md5';

export async function initDatabaseModels(sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);
}

async function addModels(sequelize) {
	const { getModelBook } = await import('../modules/book/models/index.js');

	const { getModelUser } = await import('../modules/user/models/index.js');

	const { getModelLoan } = await import('../modules/loan/models/index.js');

	const { getModelRole } = await import('../modules/role/models/index.js');

	const { getModelAction } = await import('../modules/action/models/index.js');

	const { getModelPermission } = await import(
		'../modules/permission/models/index.js'
	);

	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);
	getModelRole(sequelize);
	getModelAction(sequelize);
	getModelPermission(sequelize);

	const { Book, User, Loan, Role, Action, Permission } = sequelize.models;

	Book.belongsToMany(User, { through: Loan });

	User.hasOne(Role);
	Role.belongsTo(User);

	Role.hasMany(Action);
	Action.belongsToMany(Role, { through: Permission });

	await sequelize.sync();
}
async function addModuleProperties() {}

async function addDefaultData(sequelize) {
	const { Role } = sequelize.models;
	const roles = await Role.findAll();
	if (roles.length === 0) {
		await Role.bulkCreate([
			{
				name: 'guest',
			},
			{
				name: 'staff',
			},
			{
				name: 'admin',
			},
		]);
	}
	const { Action } = sequelize.models;
	const actions = await Action.findAll();
	if (actions.length === 0) {
		await Action.bulkCreate([
			{
				name: 'Book: read',
			},
			{
				name: 'Book: create',
			},
			{
				name: 'Book: delete',
			},
			{
				name: 'Book: update',
			},
			{
				name: 'Loan: read',
			},
			{
				name: 'Loan: create',
			},
			{
				name: 'Loan: accept',
			},
			{
				name: 'Loan: delete',
			},
			{
				name: 'User: read',
			},
			{
				name: 'User: create',
			},
			{
				name: 'User: update',
			},
			{
				name: 'User: delete',
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
			roleId: 3,
			password: md5('password123'),
		});
	}
}
