import { DataTypes, Sequelize } from 'sequelize';

export function getModelRaffle(sequelize: Sequelize) {
	sequelize.define(
		'Raffle',
		{
			interval: { type: DataTypes.INTEGER, allowNull: false },
			prize: { type: DataTypes.STRING, allowNull: false },
		},
		{ paranoid: true, tableName: 'raffle' }
	);
}
