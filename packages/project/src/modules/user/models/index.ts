import { DataTypes, Sequelize } from 'sequelize';

export function getModelUser(sequelize: Sequelize) {
	sequelize.define(
		'User',
		{
			firstName: { type: DataTypes.STRING, allowNull: false },
			lastName: { type: DataTypes.STRING, allowNull: false },
			username: { type: DataTypes.STRING, allowNull: false, unique: true },
			password: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, unique: true },
			roleId: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
			},
			budget: DataTypes.INTEGER,
			bookDiscount: DataTypes.INTEGER,
			subscriptionId: DataTypes.INTEGER,
			hasPremiumSubscription: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{ paranoid: true, tableName: 'user' }
	);
}
