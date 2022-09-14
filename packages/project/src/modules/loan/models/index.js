import { DataTypes } from 'sequelize';

export function getModelLoan(sequelize) {
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
		},
		{ paranoid: true, tableName: 'loan' }
	);
}
