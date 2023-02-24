import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Permission extends DefaultParanoidAttributes {
	ActionId: number;
	RoleId: number;
}

export interface PermissionAttributes extends Permission {
	dataValues?: Permission;
}

export type ModelPermission = Model<
	PermissionAttributes,
	PermissionAttributes
> &
	PermissionAttributes;
