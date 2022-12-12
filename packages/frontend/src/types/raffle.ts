export interface TRaffleStateProps {
	raffles: TGetRaffle[];
	error: object | string | null;
}

export interface TGetRaffle {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	prize: string;
	UserId: number;
	BookId: number;
}
