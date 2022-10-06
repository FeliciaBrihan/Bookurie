import { DataTypes, Sequelize } from 'sequelize';

export function getModelRaffle(sequelize: Sequelize) {
	sequelize.define(
		'Raffle',
		{
			prize: { type: DataTypes.INTEGER },
			BookId: DataTypes.INTEGER,
		},
		{ paranoid: true, tableName: 'raffle' }
	);
}
