import { Sequelize } from 'sequelize';
import { ModelUser } from '../index';

export type ExtraRequest = {
	sequelize?: Sequelize;
	currentUserId?: number;
	currentUser: ModelUser;
	currentUserRoleId: number;
	activeWorkspace?: string;
	token?: string;
};
