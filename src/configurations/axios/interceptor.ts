import { IAuthenticateUserRequest } from '../../redux/reducers/authReducer/auth.fetch';
import { authSlice } from '../../redux/reducers/authReducer/auth.slice';
import { DominoApi } from '../apis/DominoApi/domino.api';
import { LocalStorage } from '../localdbService/localdbService';
import { LocalStorageVariables } from '../localdbService/localdbService.types';
import { axiosHttp } from './axios';

const axiosInterceptor = (store: any) => {
	const { dispatch } = store;

	axiosHttp.interceptors.response.use(
		res => {
			return res;
		},
		async err => {
			const originalConfig = err.config;
			if (err.response && err.config) {
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;
					try {
						const lsToken = LocalStorage.GetValue(
							LocalStorageVariables.access_token
						);
						const lsRefreshToken = LocalStorage.GetValue(
							LocalStorageVariables.refresh_token
						);
						if (lsToken && lsRefreshToken) {
							const data: IAuthenticateUserRequest = {
								accessToken: lsToken,
								refreshToken: lsRefreshToken,
							};
							await dispatch(
								DominoApi.Controllers.AuthController.RefreshToken(data)
							);
							return Promise.resolve('success');
						}
					} catch (_error) {
						LocalStorage.RevokeAuthorize();
						dispatch(authSlice.actions.onRevoke());
						return Promise.reject(_error);
					}
				}
			}

			return Promise.reject(err);
		}
	);
};
export default axiosInterceptor;
