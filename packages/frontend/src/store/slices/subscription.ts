// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/live-axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { TGetSubscription, TSetSubscription } from 'types/subscription';
import { getLoggedUser } from './user';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['subscription'] = {
	error: null,
	subscriptions: [],
	subscription: undefined,
};

const slice = createSlice({
	name: 'subscription',
	initialState,
	reducers: {
		hasError(state, action) {
			state.error = action.payload;
		},

		getSubscriptionsSuccess(state, action) {
			state.subscriptions = action.payload;
		},
		getLoggedUserSubscription(state, action) {
			state.subscription = action.payload;
			console.log(state.subscription);
		},
	},
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const subscriptionApi = {
	getAll: () => async () => {
		try {
			const response = await axios.get('/subscription');
			dispatch(slice.actions.getSubscriptionsSuccess(response.data.data));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	},
	get create() {
		return async (data: TSetSubscription, options: { sync?: boolean }) => {
			try {
				const response = await axios.post<TGetSubscription>(
					`/subscription`,
					data
				);
				if (options?.sync === true) this.getAll()();
				return response.data;
			} catch (error) {
				if (options?.sync === true) dispatch(slice.actions.hasError(error));
			}
		};
	},
	get update() {
		return async (
			id: number,
			data: TSetSubscription,
			options: { sync?: boolean }
		) => {
			try {
				await axios.put(`/subscription/${id}`, data);
				if (options?.sync === true) this.getAll()();
			} catch (error) {
				if (options?.sync === true) dispatch(slice.actions.hasError(error));
			}
		};
	},
};

export function deleteSubscription(id: number, options: { sync?: boolean }) {
	return async () => {
		try {
			const response = await axios.delete(`/subscription/${id}`);
			console.log(response);
			if (options?.sync === true) subscriptionApi.getAll()();
		} catch (error) {
			dispatch(slice.actions.hasError(error));
			console.log(error);
		}
	};
}
export function subscribe(id: number) {
	return async () => {
		try {
			const response = await axios.put(`/subscription/${id}/subscribe`);
			console.log(response);
			const res = await axios.get('http://localhost:5000/user/allowed');
			dispatch(getLoggedUser(res.data.loggedUser));
			dispatch(getLoggedUserSubscription(res.data.subscription));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
			console.log(error);
		}
	};
}

export function getLoggedUserSubscription(response: any) {
	return async () => {
		try {
			console.log('subscriptionApi', response);
			dispatch(slice.actions.getLoggedUserSubscription(response));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
			console.log(error);
		}
	};
}
