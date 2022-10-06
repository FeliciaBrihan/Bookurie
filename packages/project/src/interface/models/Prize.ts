import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Prize extends DefaultParanoidAttributes {
	bookId: number;
	voucher: number;
}

export interface PrizeAttributes extends Prize {
	dataValues?: Prize;
}

export type ModelPrize = Model<PrizeAttributes, PrizeAttributes> &
	PrizeAttributes;
