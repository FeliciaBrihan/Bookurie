import md5 from 'md5';
import { Sequelize } from 'sequelize';
import { Models } from 'src/interface';

export async function initDatabaseModels(sequelize: Sequelize) {
	await addModels(sequelize);
	await addModuleProperties(sequelize);
	await addDefaultData(sequelize);
}

async function addModels(sequelize: Sequelize) {
	const { getModelBook } = await import('src/modules/book/models');

	const { getModelUser } = await import('src/modules/user/models');

	const { getModelLoan } = await import('src/modules/loan/models');

	const { getModelRole } = await import('src/modules/role/models');

	const { getModelAction } = await import('src/modules/action/models');

	const { getModelPurchase } = await import('src/modules/purchase/models');

	const { getModelSubscription } = await import(
		'src/modules/subscription/models'
	);
	const { getModelRaffle } = await import('src/modules/raffle/models');

	const { getModelPrize } = await import('src/modules/prize/models');

	const { getModelAddress } = await import('src/modules/address/models');

	getModelLoan(sequelize);
	getModelBook(sequelize);
	getModelUser(sequelize);
	getModelRole(sequelize);
	getModelAction(sequelize);
	getModelPurchase(sequelize);
	getModelSubscription(sequelize);
	getModelRaffle(sequelize);
	getModelPrize(sequelize);
	getModelAddress(sequelize);

	const {
		Book,
		User,
		Loan,
		Role,
		Action,
		Purchase,
		Subscription,
		Raffle,
		Address,
	} = sequelize.models as unknown as Models;

	Book.belongsToMany(User, { through: Loan, onDelete: 'CASCADE' });
	Book.belongsToMany(User, {
		through: { model: Purchase, unique: false },
		onDelete: 'CASCADE',
	});

	User.hasOne(Role);
	Role.belongsTo(User);

	Role.hasMany(Action);
	Action.belongsTo(Role);

	User.hasOne(Subscription);
	Subscription.belongsTo(User);

	User.hasOne(Raffle);
	Raffle.belongsTo(User);

	User.hasOne(Address);
	Address.belongsTo(User);

	await sequelize.sync();
}
async function addModuleProperties(_: Sequelize) {
	//
}

async function addDefaultData(sequelize: Sequelize) {
	const { Role, Action, User, Subscription, Prize } =
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
			},
		]);
	}
	const prizes = await Prize.findAll();
	if (prizes.length === 0) {
		await Prize.create({
			voucher: 0,
			bookId: null,
		});
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
			{
				name: 'Prize: update',
			},
			{
				name: 'Role: create',
			},
			{
				name: 'Role: update',
			},
			{
				name: 'Role: delete',
			},
		]);
	}
}
