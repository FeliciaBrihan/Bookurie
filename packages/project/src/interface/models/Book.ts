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
	typeFormat: string;
	pages: number;
	price: number;
	stockOld: number;
	stockNew: number;
}

export interface BookAttributes extends Book {
	dataValues?: Book;
}

export type ModelBook = Model<BookAttributes, BookAttributes> & BookAttributes;
