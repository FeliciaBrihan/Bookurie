import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Book extends DefaultParanoidAttributes {
	title: string;
	author: string;
	publishingHouse: string;
	coverImage: string;
	genre: string;
	description: string;
	isAvailable: boolean;
}

export interface BookAttributes extends Book {
	dataValues?: Book;
}

export type ModelBook = Model<BookAttributes, BookAttributes> & BookAttributes;
