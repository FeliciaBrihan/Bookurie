import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Address extends DefaultParanoidAttributes {
	street: string;
	number: number;
	city: string;
	building: string;
	apartment: number;
	country: string;
	zipCode: number;
	contact: number;
	UserId: number;
}

export interface AddressAttributes extends Address {
	dataValues?: Address;
}

export type ModelAddress = Model<AddressAttributes, AddressAttributes> &
	AddressAttributes;
