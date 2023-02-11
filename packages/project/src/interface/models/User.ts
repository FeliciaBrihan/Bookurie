import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface User extends DefaultParanoidAttributes {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email: string;
	roleId: number;
	budget: number;
	subscriptionId: number;
	subscriptionDate: Date;
	subscriptionExpirationDate: Date;
	booksReadThisMonth: number;
	addressId: number;
}

export interface UserAttributes extends User {
	dataValues?: User;
}

export type ModelUser = Model<UserAttributes, UserAttributes> & UserAttributes;
