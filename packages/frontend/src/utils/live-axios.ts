import axios from 'axios';
import useAuth from 'hooks/useAuth';

const axiosServices = axios.create({
	baseURL: 'http://localhost:3001',
});

export function axiosSetAuthorization(token: string) {
	axiosServices.defaults.headers.common.authorization = token;
}

axiosServices.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response.status === 403) {
			const { firebaseGoogleSignIn } = useAuth();
			await firebaseGoogleSignIn();
		}

		return Promise.reject(
			(error.response && error.response.data) || 'Wrong Services'
		);
	}
);

export default axiosServices;
