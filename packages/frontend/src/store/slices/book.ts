// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/live-axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { TGetBook, TSetBook } from 'types/book';
import { ProductsFilter } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['book'] = {
	error: null,
	book: null,
	books: [],
	addresses: [],
};

const slice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		hasError(state, action) {
			state.error = action.payload;
		},

		getBooksSuccess(state, action) {
			state.books = action.payload;
		},
		getBookSuccess(state, action) {
			state.book = action.payload;
		},
		// FILTER PRODUCTS
		filterProductsSuccess(state, action) {
			state.books = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;
export const { hasError } = slice.actions;

// ----------------------------------------------------------------------

export const bookApi = {
	getAll: () => async () => {
		try {
			const response = await axios.get('/book');
			dispatch(slice.actions.getBooksSuccess(response.data.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	},

	get create() {
		return async (data: TSetBook, options: { sync?: boolean }) => {
			try {
				const response = await axios.post<TGetBook>(`/book`, data);
				if (options?.sync === true) this.getAll()();
				return response.data;
			} catch (error) {
				console.log(error);
				if (options?.sync === true) dispatch(slice.actions.hasError(error));
			}
		};
	},
	get update() {
		return async (id: number, data: TSetBook, options: { sync?: boolean }) => {
			try {
				await axios.put(`/book/${id}`, data);
				if (options?.sync === true) this.getAll()();
			} catch (error) {
				if (options?.sync === true) dispatch(slice.actions.hasError(error));
			}
		};
	},
};

export function getProduct(id: string | undefined) {
	return async () => {
		try {
			const response = await axios.get(`/book/${id}`);
			console.log(response);
			dispatch(slice.actions.getBookSuccess(response.data.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function deleteBook(id: number, options: { sync?: boolean }) {
	return async () => {
		try {
			const response = await axios.delete(`/book/${id}`);
			console.log(response);
			if (options?.sync === true) bookApi.getAll()();
		} catch (error) {
			dispatch(slice.actions.hasError(error));
			console.log(error);
		}
	};
}

export function filterProducts(filter: ProductsFilter) {
	return async () => {
		try {
			console.log(filter);
			const response = await axios.get('/book', { params: filter });
			console.log(response);
			dispatch(slice.actions.filterProductsSuccess(response.data.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}
