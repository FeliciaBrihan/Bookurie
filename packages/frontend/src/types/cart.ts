import { KeyedObject } from 'types';

export interface CartStateProps {
	checkout: CartCheckoutStateProps;
	error: object | string | null;
}

export interface CartCheckoutStateProps {
	step: number;
	products: CartProductStateProps[];
	subtotal: number;
	total: number;
	discount: number;
	shipping: number;
	billing: Address | null;
	payment: CartPaymentStateProps;
}

export interface CartProductStateProps {
	itemId?: string | number;
	id: number;
	title: string;
	author: string;
	image: string;
	price: number;
	pages: number;
	typeFormat: string;
	stockOld: number;
	stockNew: number;
	quantity: number;
	pricePromo: number;
}

export type Address = {
	id?: string | number | undefined;
	name: string;
	destination: string;
	building: string;
	street: string;
	city: string;
	state: string;
	country: string;
	post: string | number;
	phone: string | number;
	isDefault: boolean;
};

export interface CartPaymentStateProps {
	type: string;
	method: string;
	card: string;
}

export interface ProductCardProps extends KeyedObject {
	id?: string | number;
	title: string;
	author: string;
	image: string;
	description?: string;
	price?: number;
	pages?: number;
	typeFormat: string;
	genre?: string;
	stockOld: number;
	stockNew: number;
}
