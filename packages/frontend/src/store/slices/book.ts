// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/live-axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { TGetBook, TSetBook } from 'types/book';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['book'] = {
	error: null,
	books: [],
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
	},
});

// Reducer
export default slice.reducer;

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
				const response = await axios.post<TGetBook>(`/role`, data);
				if (options?.sync === true) this.getAll()();
				return response.data;
			} catch (error) {
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