import { DataTypes, Sequelize } from 'sequelize';

export function getModelRaffle(sequelize: Sequelize) {
	sequelize.define(
		'Raffle',
		{
			prize: { type: DataTypes.STRING, allowNull: false },
			BookId: DataTypes.INTEGER,
		},
		{ paranoid: true, tableName: 'raffle' }
	);
}
