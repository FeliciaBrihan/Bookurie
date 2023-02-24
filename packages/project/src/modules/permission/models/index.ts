import { DataTypes, Sequelize } from 'sequelize';

export function getModelPermission(sequelize: Sequelize) {
	sequelize.define(
		'Permission',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
		},
		{ paranoid: true, tableName: 'permission' }
	);
}
