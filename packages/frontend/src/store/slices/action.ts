// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/live-axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['action'] = {
	error: null,
	actions: [],
};

const slice = createSlice({
	name: 'action',
	initialState,
	reducers: {
		hasError(state, action) {
			state.error = action.payload;
		},

		getActionSuccess(state, action) {
			state.actions = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const actionApi = {
	getAll: () => async () => {
		try {
			const response = await axios.get('/action');
			dispatch(slice.actions.getActionSuccess(response.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	},
};
