import axios from 'axios';

export const currentApiUrl = 'https://localhost:7241/';

export const axiosHttp = axios.create({
	baseURL: currentApiUrl,
	headers: {
		'Content-type': 'application/json',
	},
});

export const AuthorizateHeader = (token: any) => {
	return {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	};
};
