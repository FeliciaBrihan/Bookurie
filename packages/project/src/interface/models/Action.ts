import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Action extends DefaultParanoidAttributes {
	name: string;
	RoleId: number;
}

export interface ActionAttributes extends Action {
	dataValues?: Action;
}

export type ModelAction = Model<ActionAttributes, ActionAttributes> &
	ActionAttributes;
