import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const token = localStorage.getItem('token');
const axiosServices = axios.create({
	baseURL: 'http://localhost:5000',
	...axios(token ? { headers: { authorization: token } } : {}),
});

axiosServices.interceptors.response.use(
	(response) => response,
	async (error) => {
		try {
			if (error.response.status === 403) await firebase.auth().signOut();
		} catch (error) {
			console.error(error);
		}

		return Promise.reject(
			(error.response && error.response.data) || 'Wrong Services'
		);
	}
);

export default axiosServices;
