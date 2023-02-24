import { DataTypes, Sequelize } from 'sequelize';

export function getModelUser(sequelize: Sequelize) {
	sequelize.define(
		'User',
		{
			firstName: { type: DataTypes.STRING, allowNull: false },
			lastName: { type: DataTypes.STRING, allowNull: false },
			username: { type: DataTypes.STRING, allowNull: false, unique: true },
			password: { type: DataTypes.STRING, allowNull: false },
			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: { isEmail: true },
			},
			roleId: {
				type: DataTypes.INTEGER,
				defaultValue: 1,
			},
			budget: DataTypes.INTEGER,
			subscriptionId: DataTypes.INTEGER,
			subscriptionDate: {
				type: DataTypes.DATE,
			},
			subscriptionExpirationDate: {
				type: DataTypes.DATE,
			},
			booksReadThisMonth: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			addressId: DataTypes.INTEGER,
		},
		{ tableName: 'user' }
	);
}
