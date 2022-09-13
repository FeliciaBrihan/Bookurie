import { DataTypes } from 'sequelize';

export function getModelUser(sequelize) {
	sequelize.define(
		'User',
		{
			firstName: { type: DataTypes.STRING, allowNull: false },
			lastName: { type: DataTypes.STRING, allowNull: false },
			username: { type: DataTypes.STRING, allowNull: false, unique: true },
			password: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, unique: true },
			isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
			role: { type: DataTypes.STRING, defaultValue: 'user' },
		},
		{ paranoid: true, tableName: 'user' }
	);
}
