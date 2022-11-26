export interface TRoleStateProps {
	roles: TGetRole[];
	error: object | string | null;
}

export interface TSetRole {
	name: string;
	allowedAction: number[];
}

export interface TGetRole {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	allowedAction: number[];
}
