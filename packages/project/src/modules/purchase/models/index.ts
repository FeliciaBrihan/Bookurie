import { DataTypes, Sequelize } from 'sequelize';

export function getModelPurchase(sequelize: Sequelize) {
	sequelize.define(
		'Purchase',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			price: DataTypes.INTEGER,
			orderId: DataTypes.STRING,
		},
		{ paranoid: true, tableName: 'purchase' }
	);
}
