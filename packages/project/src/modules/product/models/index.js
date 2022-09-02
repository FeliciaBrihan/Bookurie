import { DataTypes, Sequelize } from 'sequelize';

export function getModelProduct(sequelize) {
	sequelize.define(
		'Product',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			category: {
				type: DataTypes.STRING,
			},
		},
		{ paranoid: true, tableName: 'product' }
	);
}
