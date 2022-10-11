import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Purchase extends DefaultParanoidAttributes {
	BookId: number;
	UserId: number;
}

export interface PurchaseAttributes extends Purchase {
	dataValues?: Purchase;
}

export type ModelPurchase = Model<PurchaseAttributes, PurchaseAttributes> &
	PurchaseAttributes;
