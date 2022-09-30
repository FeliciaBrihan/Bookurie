import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Subscription extends DefaultParanoidAttributes {
	name: string;
	monthlyFee: number;
	monthlyFreeBooks: number;
	everyBookDiscount: number;
	type: string;
}

export interface SubscriptionAttributes extends Subscription {
	dataValues?: Subscription;
}

export type ModelSubscription = Model<
	SubscriptionAttributes,
	SubscriptionAttributes
> &
	SubscriptionAttributes;
