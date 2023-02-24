import { Sequelize } from 'sequelize';
import { ModelUser } from 'src/interface';

export type ExtraRequest = {
	sequelize?: Sequelize;
	currentUserId?: number;
	currentUser: ModelUser;
	currentUserRoleId: number;
	activeWorkspace?: string;
	token?: string;
};
