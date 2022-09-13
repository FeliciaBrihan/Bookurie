import { DataTypes } from 'sequelize';

export function getModelLoan(sequelize) {
	sequelize.define(
		'Loan',
		{
			isAccepted: {
				type: DataTypes.BOOLEAN,
				default: false,
			},
			expirationDate: {
				type: DataTypes.DATE,
			},
		},
		{ paranoid: true, tableName: 'loan' }
	);
}
