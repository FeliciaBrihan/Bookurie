import { TGetRole } from './roles';

export interface TUserStateProps {
	users: TGetUser[];
	activeUsers: TGetUser[];
	error: object | string | null;
}

export interface TSetUser {
	firstName: string;
	lastName: string;
	email: string;
	roleId?: number;
	active?: boolean;
}

export interface TGetUser {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	firstName: string;
	lastName: string;
	email: string;
	MRole?: Pick<TGetRole, 'id' | 'name'>;
	active: boolean;
}
