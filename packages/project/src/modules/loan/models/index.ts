import { DataTypes, Sequelize } from 'sequelize';

export function getModelLoan(sequelize: Sequelize) {
	sequelize.define(
		'Loan',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			isAccepted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			expirationDate: {
				type: DataTypes.DATE,
			},
			isReturned: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			price: {
				type: DataTypes.INTEGER,
			},
		},
		{ tableName: 'loan' }
	);
}
