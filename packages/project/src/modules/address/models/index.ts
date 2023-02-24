import { DataTypes, Sequelize } from 'sequelize';

export function getModelAddress(sequelize: Sequelize) {
	sequelize.define(
		'Address',
		{
			street: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			number: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			building: DataTypes.STRING,
			apartment: DataTypes.INTEGER,
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			country: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			zipCode: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			contact: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ tableName: 'address' }
	);
}
