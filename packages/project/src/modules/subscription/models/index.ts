import { DataTypes, Sequelize } from 'sequelize';

export function getModelSubscription(sequelize: Sequelize) {
	sequelize.define(
		'Subscription',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			monthlyFee: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			monthlyFreeBooks: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			everyBookDiscount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM('basic', 'premium'),
				allowNull: false,
			},
		},
		{ tableName: 'subscription' }
	);
}
