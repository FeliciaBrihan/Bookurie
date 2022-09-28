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
		},
		{ paranoid: true, tableName: 'purchase' }
	);
}
