import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Raffle extends DefaultParanoidAttributes {
	interval: number;
	prize: string;
}

export interface RaffleAttributes extends Raffle {
	dataValues?: Raffle;
}

export type ModelRaffle = Model<RaffleAttributes, RaffleAttributes> &
	RaffleAttributes;
