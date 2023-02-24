import { DataTypes, Sequelize } from 'sequelize';

export function getModelAction(sequelize: Sequelize) {
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
