// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/live-axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['purchase'] = {
	error: null,
	purchases: [],
};

const slice = createSlice({
	name: 'purchase',
	initialState,
	reducers: {
		hasError(state, action) {
			state.error = action.payload;
		},

		getPurchasesSuccess(state, action) {
			state.purchases = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const purchaseApi = {
	getAll: () => async () => {
		try {
			const response = await axios.get('/purchase/all');
			dispatch(slice.actions.getPurchasesSuccess(response.data.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	},
};
