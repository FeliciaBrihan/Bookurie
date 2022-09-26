import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Book extends DefaultParanoidAttributes {
	title: string;
	author: string;
	publishingHouse: string;
	publishedYear: number;
	coverImage: string;
	genre: string;
	description: string;
	isAvailable: boolean;
	typeFormat: string;
	pages: number;
	price: number;
	stock: number;
}

export interface BookAttributes extends Book {
	dataValues?: Book;
}

export type ModelBook = Model<BookAttributes, BookAttributes> & BookAttributes;
