import { DataTypes, Sequelize } from 'sequelize';

export function getModelRole(sequelize: Sequelize) {
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
