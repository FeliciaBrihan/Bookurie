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
	const { getModelPremium } = await import('../modules/premium/models/index');

	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);
	getModelRole(sequelize);
	getModelAction(sequelize);
	getModelPermission(sequelize);
	getModelPurchase(sequelize);
	getModelSubscription(sequelize);
	getModelPremium(sequelize);

	const {
		Book,
		User,
		Loan,
		Role,
		Action,
		Permission,
		Purchase,
		Subscription,
		Premium,
	} = sequelize.models as unknown as Models;

	Book.belongsToMany(User, { through: Loan });
	Book.belongsToMany(User, { through: Purchase });

	User.hasOne(Role);
	Role.belongsTo(User);

	Role.hasMany(Action);
	Action.belongsToMany(Role, { through: Permission });

	User.hasOne(Subscription);
	Subscription.belongsTo(User);

	User.hasOne(Premium);
	Premium.belongsTo(User);

	await sequelize.sync({ force: true });
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
			{
				name: 'subscriber',
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
	const { Premium } = sequelize.models as unknown as Models;
	const premium = await Premium.findAll();
	if (premium.length === 0) {
		await Premium.create({
			monthlyFee: 200,
			raffleInterval: 15,
			rafflePrize: 'book',
			everyBookDiscount: 40,
		});
	}
}
