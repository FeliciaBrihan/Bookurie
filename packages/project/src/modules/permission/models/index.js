import { DataTypes } from 'sequelize';

export function getModelPermission(sequelize) {
	sequelize.define(
		'Permission',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ paranoid: true, tableName: 'permission' }
	);
}
