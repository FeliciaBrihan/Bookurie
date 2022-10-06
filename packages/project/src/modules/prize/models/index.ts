import { DataTypes, Sequelize } from 'sequelize';

export function getModelPrize(sequelize: Sequelize) {
	sequelize.define(
		'Prize',
		{
			bookId: DataTypes.INTEGER,

			voucher: DataTypes.INTEGER,
		},
		{ paranoid: true, tableName: 'prize' }
	);
}
