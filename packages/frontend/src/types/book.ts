export interface TBookStateProps {
	books: TGetBook[];
	error: object | string | null;
}

export interface TSetBook {
	title: string;
	author: string;
	publishingHouse: string;
	publishedYear?: number;
	coverImage: string;
	genre: string;
	description: string;
	pages?: number;
	typeFormat: string;
	price?: number;
	stock?: number;
}
export interface TGetBook {
	id: number;
	title: string;
	author: string;
	publishingHouse: string;
	publishedYear: number;
	coverImage: string;
	genre: string;
	description: string;
	pages: number;
	typeFormat: string;
	price: number;
	stock: number;
	createdAt: Date;
	updatedAt: Date;
}
