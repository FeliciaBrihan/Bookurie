/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// action - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import { FIREBASE_API } from 'config';
import { FirebaseContextType, InitialLoginContextProps } from 'types/auth';
import { getIdToken } from 'firebase/auth';
import axios, { axiosSetAuthorization } from 'utils/live-axios';
import { Snackbar, Alert } from '@mui/material';

// firebase initialize
if (!firebase.apps.length) {
	firebase.initializeApp(FIREBASE_API);
}

// const
const initialState: InitialLoginContextProps = {
	isLoggedIn: false,
	isInitialized: false,
	user: null,
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({
	children,
}: {
	children: React.ReactElement;
}) => {
	const [state, dispatch] = useReducer(accountReducer, initialState);
	const [open, setOpen] = React.useState(false);

	useEffect(
		() =>
			firebase.auth().onAuthStateChanged(async (user) => {
				setOpen(false);
				if (user) {
					const token = await getIdToken(user!);
					try {
						await axios.get('/user/allowed', {
							headers: { authorization: token },
						});
						localStorage.setItem('email', user?.email!);
						axiosSetAuthorization(token);
						dispatch({
							type: LOGIN,
							payload: {
								isLoggedIn: true,
								user: {
									id: user.uid,
									email: user.email!,
									name: user.displayName!,
								},
							},
						});
					} catch (error) {
						dispatch({
							type: LOGOUT,
						});
						setOpen(true);
					}
				} else {
					dispatch({
						type: LOGOUT,
					});
					localStorage.removeItem('email');
				}
			}),
		[dispatch]
	);

	firebase.auth().onIdTokenChanged(async (user) => {
		if (user) {
			const token = await getIdToken(user);
			axiosSetAuthorization(token);
		}
	});

	const firebaseEmailPasswordSignIn = (email: string, password: string) =>
		firebase.auth().signInWithEmailAndPassword(email, password);

	const firebaseGoogleSignIn = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		return firebase.auth().signInWithPopup(provider);
	};

	const firebaseRegister = async (email: string, password: string) =>
		firebase.auth().createUserWithEmailAndPassword(email, password);

	const logout = () => firebase.auth().signOut();

	const resetPassword = async (email: string) => {
		await firebase.auth().sendPasswordResetEmail(email);
	};

	const updateProfile = () => {};
	if (state.isInitialized !== undefined && !state.isInitialized) {
		return <Loader />;
	}

	return (
		<>
			<FirebaseContext.Provider
				value={{
					...state,
					firebaseRegister,
					firebaseEmailPasswordSignIn,
					login: () => {},
					firebaseGoogleSignIn,
					logout,
					resetPassword,
					updateProfile,
				}}
			>
				{children}
			</FirebaseContext.Provider>
			{open && (
				<>
					<Snackbar
						open
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					>
						<Alert severity="error" sx={{ width: '100%' }}>
							Unauthorized user!
						</Alert>
					</Snackbar>
					<Snackbar
						open
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					>
						<Alert severity="info" sx={{ width: '100%', marginTop: '55px' }}>
							In order to retry login with same google account is required to
							refresh first the page!
						</Alert>
					</Snackbar>
				</>
			)}
		</>
	);
};

export default FirebaseContext;
