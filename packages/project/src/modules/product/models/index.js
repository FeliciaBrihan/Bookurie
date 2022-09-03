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
		},
		{ paranoid: true, tableName: 'product' }
	);
}
