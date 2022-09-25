import md5 from 'md5';
import { Sequelize } from 'sequelize';
import { Models } from '../interface';

export async function initDatabaseModels(sequelize: Sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);
}

async function addModels(sequelize: Sequelize) {
	const { getModelBook } = await import('../modules/book/models/index');

	const { getModelUser } = await import('../modules/user/models/index');

	const { getModelLoan } = await import('../modules/loan/models/index');

	const { getModelRole } = await import('../modules/role/models/index');

	const { getModelAction } = await import('../modules/action/models/index');

	const { getModelPermission } = await import(
		'../modules/permission/models/index'
	);

	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);
	getModelRole(sequelize);
	getModelAction(sequelize);
	getModelPermission(sequelize);

	const { Book, User, Loan, Role, Action, Permission } =
		sequelize.models as unknown as Models;

	Book.belongsToMany(User, { through: Loan });

	User.hasOne(Role);
	Role.belongsTo(User);

	Role.hasMany(Action);
	Action.belongsToMany(Role, { through: Permission });

	await sequelize.sync();
}
async function addModuleProperties(_: Sequelize) {}

async function addDefaultData(sequelize: Sequelize) {
	const { Role } = sequelize.models as unknown as Models;
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
	const { Action } = sequelize.models as unknown as Models;
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

	const { User } = sequelize.models as unknown as Models;
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
