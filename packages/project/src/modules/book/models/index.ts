import { DataTypes, Sequelize } from 'sequelize';

export function getModelBook(sequelize: Sequelize) {
	sequelize.define(
		'Book',
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			author: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			publishingHouse: DataTypes.STRING,

			coverImage: DataTypes.STRING,

			genre: DataTypes.STRING,

			description: DataTypes.STRING,

			isAvailable: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{ paranoid: true, tableName: 'book' }
	);
}
