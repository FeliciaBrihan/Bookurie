// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/live-axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { TSetLoan } from 'types/loan';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['loan'] = {
	error: null,
	loans: [],
	userLoans: [],
};

const slice = createSlice({
	name: 'loan',
	initialState,
	reducers: {
		hasError(state, action) {
			state.error = action.payload;
		},

		getLoansSuccess(state, action) {
			state.loans = action.payload;
		},
		getUserLoansSuccess(state, action) {
			state.userLoans = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const loanApi = {
	getAll: () => async () => {
		try {
			const response = await axios.get('/loan');
			dispatch(slice.actions.getLoansSuccess(response.data.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	},
	get update() {
		return async (id: number, data: TSetLoan, options: { sync?: boolean }) => {
			try {
				await axios.put(`/loan/${id}`, data);
				if (options?.sync === true) this.getAll()();
			} catch (error) {
				console.log(error);
				if (options?.sync === true) dispatch(slice.actions.hasError(error));
			}
		};
	},
};

export function create(id: number) {
	return async () => {
		try {
			const response = await axios.post(`/book/${id}/loan`);

			console.log(response);
		} catch (error) {
			dispatch(slice.actions.hasError(error));
			console.log(error);
		}
	};
}

export function deleteLoan(id: number, options: { sync?: boolean }) {
	return async () => {
		try {
			const response = await axios.delete(`/loan/${id}`);
			console.log(response);
			if (options?.sync === true) loanApi.getAll()();
		} catch (error) {
			dispatch(slice.actions.hasError(error));
			console.log(error);
		}
	};
}
export function getUserLoans() {
	return async () => {
		try {
			const response = await axios.get(`loan/loans`);
			dispatch(slice.actions.getUserLoansSuccess(response.data.data));
			console.log(response);
		} catch (error) {
			dispatch(slice.actions.hasError(error));
			console.log(error);
		}
	};
}
