export interface TPurchaseStateProps {
	purchases: TGetPurchase[];
	error: object | string | null;
}

export interface TSetPurchase {
	BookId: number;
	UserId: number;
	price: number;
}
export interface TGetPurchase {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	BookId: number;
	UserId: number;
	price: number;
}
