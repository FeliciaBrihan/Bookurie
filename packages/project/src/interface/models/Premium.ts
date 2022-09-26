import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Premium extends DefaultParanoidAttributes {
	monthlyFee: number;
	raffleInterval: number;
	rafflePrize: string;
	everyBookDiscount: number;
}

export interface PremiumAttributes extends Premium {
	dataValues?: Premium;
}

export type ModelPremium = Model<PremiumAttributes, PremiumAttributes> &
	PremiumAttributes;
