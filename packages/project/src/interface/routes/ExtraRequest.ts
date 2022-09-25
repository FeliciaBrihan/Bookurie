import { Sequelize } from 'sequelize';

export type ExtraRequest = {
	sequelize?: Sequelize;
	currentUserId?: number;
	currentUser: object;
	currentUserRoleId: number;
	activeWorkspace?: string;
	token?: string;
};
