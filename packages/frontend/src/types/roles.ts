export interface TRoleStateProps {
	roles: TGetRole[];
	error: object | string | null;
}

export interface TSetRole {
	name: string;
}
export interface TGetRole {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
}
