import { DataTypes } from 'sequelize';

export function getModelAction(sequelize) {
	sequelize.define(
		'Action',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
		},
		{ paranoid: true, tableName: 'action' }
	);
}
