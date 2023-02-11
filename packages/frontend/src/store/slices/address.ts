// third-party
import { createSlice } from '@reduxjs/toolkit';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types';
import { Address } from 'types/e-commerce';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['address'] = {
	error: null,
	addresses: [],
};

const slice = createSlice({
	name: 'address',
	initialState,
	reducers: {
		// HAS ERROR
		hasError(state, action) {
			state.error = action.payload;
		},

		// GET ADDRESSES
		getAddressesSuccess(state, action) {
			state.addresses = action.payload;
		},

		// ADD ADDRESS
		addAddressSuccess(state, action) {
			state.addresses = action.payload;
		},

		// EDIT ADDRESS
		editAddressSuccess(state, action) {
			state.addresses = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getAddresses() {
	return async () => {
		try {
			const response = await axios.get('/address');
			dispatch(slice.actions.getAddressesSuccess(response.data.address));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function addAddress(address: Address) {
	return async () => {
		try {
			const response = await axios.post('/address/', address);
			dispatch(slice.actions.addAddressSuccess(response.data.address));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

export function editAddress(address: Address) {
	return async () => {
		try {
			const response = await axios.post('/api/address/edit', address);
			dispatch(slice.actions.editAddressSuccess(response.data.address));
		} catch (error) {
			dispatch(slice.actions.hasError(error));
		}
	};
}

SwitchAccessShortcutIcon;
