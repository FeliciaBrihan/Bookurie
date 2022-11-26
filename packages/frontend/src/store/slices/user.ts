// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/live-axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { TSetUser } from 'types/user';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['user'] = {
	error: null,
	users: [],
	activeUsers: [],
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		hasError(state, action) {
			state.error = action.payload;
		},

		getUsersSuccess(state, action) {
			state.users = action.payload;
		},

		getActiveUsersSuccess(state, action) {
			state.activeUsers = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
interface ReqQuery {
	status: 'all' | 'active';
}

export const userApi = {
	getAll: (query: ReqQuery) => async () => {
		try {
			const response = await axios.get('/user', { params: query });
			if (query.status === 'all')
				dispatch(slice.actions.getUsersSuccess(response.data));
			else dispatch(slice.actions.getActiveUsersSuccess(response.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	},
	get create() {
		return async (data: TSetUser, options: { sync?: boolean }) => {
			try {
				await axios.post(`/user`, data);
				if (options?.sync === true) this.getAll({ status: 'all' })();
			} catch (error) {
				if (options?.sync === true) dispatch(slice.actions.hasError(error));
			}
		};
	},
	get update() {
		return async (id: number, data: TSetUser, options: { sync?: boolean }) => {
			try {
				await axios.put(`/user/${id}`, data);
				if (options?.sync === true) this.getAll({ status: 'all' })();
			} catch (error) {
				if (options?.sync === true) dispatch(slice.actions.hasError(error));
			}
		};
	},
};
