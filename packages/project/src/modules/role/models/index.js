import { DataTypes } from 'sequelize';

export function getModelRole(sequelize) {
	sequelize.define(
		'Role',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ paranoid: true, tableName: 'role' }
	);
}
