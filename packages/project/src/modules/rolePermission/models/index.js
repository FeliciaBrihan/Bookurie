import { DataTypes } from 'sequelize';

export function getModelRolePermission(sequelize) {
	sequelize.define(
		'RolePermission',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
		},
		{ paranoid: true, timestamps: false, tableName: 'rolePermission' }
	);
}
