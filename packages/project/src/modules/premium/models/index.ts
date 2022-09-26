import { DataTypes, Sequelize } from 'sequelize';

export function getModelPremium(sequelize: Sequelize) {
	sequelize.define(
		'Premium',
		{
			monthlyFee: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			raffleInterval: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			rafflePrize: {
				type: DataTypes.ENUM('book', 'voucher'),
				allowNull: false,
			},
			everyBookDiscount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ paranoid: true, tableName: 'premium' }
	);
}
