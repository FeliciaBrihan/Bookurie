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
			publishedYear: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			coverImage: DataTypes.STRING,

			genre: DataTypes.STRING,

			description: DataTypes.STRING,

			pages: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			typeFormat: {
				type: DataTypes.ENUM('online', 'printed'),
			},
			price: DataTypes.INTEGER,

			stock: DataTypes.INTEGER,

			isAvailable: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{ paranoid: true, tableName: 'book' }
	);
}
