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
	const { getModelPurchase } = await import('../modules/purchase/models/index');
	const { getModelSubscription } = await import(
		'../modules/subscription/models/index'
	);
	const { getModelRaffle } = await import('../modules/raffle/models/index');

	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);
	getModelRole(sequelize);
	getModelAction(sequelize);
	getModelPermission(sequelize);
	getModelPurchase(sequelize);
	getModelSubscription(sequelize);
	getModelRaffle(sequelize);

	const {
		Book,
		User,
		Loan,
		Role,
		Action,
		Permission,
		Purchase,
		Subscription,
		Raffle,
	} = sequelize.models as unknown as Models;

	Book.belongsToMany(User, { through: Loan });
	Book.belongsToMany(User, { through: Purchase });

	User.hasOne(Role);
	Role.belongsTo(User);

	Role.hasMany(Action);
	Action.belongsToMany(Role, { through: Permission });

	User.hasOne(Subscription);
	Subscription.belongsTo(User);

	User.hasOne(Raffle);
	Raffle.belongsTo(User);

	await sequelize.sync();
}
async function addModuleProperties(_: Sequelize) {}

async function addDefaultData(sequelize: Sequelize) {
	const { Role, Action, User, Subscription, Permission } =
		sequelize.models as unknown as Models;
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
			{
				name: 'subscriber',
			},
		]);
	}
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
			{
				name: 'Subscription: create',
			},
			{
				name: 'Subscription: delete',
			},
			{
				name: 'Subscription: update',
			},
			{
				name: 'Subscription: read',
			},
		]);
	}

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

	const subscriptions = await Subscription.findAll();
	if (subscriptions.length === 0) {
		await Subscription.bulkCreate([
			{
				name: 'Basic',
				monthlyFee: 30,
				monthlyFreeBooks: 10,
				everyBookDiscount: 10,
				type: 'basic',
			},
			{
				name: 'Premium',
				monthlyFee: 100,
				monthlyFreeBooks: 1000,
				everyBookDiscount: 40,
				type: 'premium',
				rafflePrize: 50,
			},
		]);
	}
	const permissions = await Permission.findAll();
	if (permissions.length === 0) {
		await Permission.bulkCreate([
			{
				RoleId: 3,
				ActionId: 1,
			},
			{
				RoleId: 3,
				ActionId: 2,
			},
			{
				RoleId: 3,
				ActionId: 3,
			},
			{
				RoleId: 3,
				ActionId: 4,
			},
			{
				RoleId: 3,
				ActionId: 5,
			},
			{
				RoleId: 3,
				ActionId: 6,
			},
			{
				RoleId: 3,
				ActionId: 7,
			},
			{
				RoleId: 3,
				ActionId: 8,
			},
			{
				RoleId: 3,
				ActionId: 9,
			},
			{
				RoleId: 3,
				ActionId: 10,
			},
			{
				RoleId: 3,
				ActionId: 11,
			},
			{
				RoleId: 3,
				ActionId: 12,
			},
			{
				RoleId: 3,
				ActionId: 13,
			},
			{
				RoleId: 3,
				ActionId: 14,
			},
			{
				RoleId: 3,
				ActionId: 15,
			},
			{
				RoleId: 3,
				ActionId: 16,
			},
		]);
	}
}
