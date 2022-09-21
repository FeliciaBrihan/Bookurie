import { DataTypes } from 'sequelize';

export function getModelResource(sequelize) {
	sequelize.define(
		'Resource',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ paranoid: true, tableName: 'resource' }
	);
}
