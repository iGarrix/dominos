import { AxiosResponse } from 'axios';
import { AppDispatch } from '../../store';
import { IAuthenticateUserRequest, ILoginByEmailRequest } from './auth.fetch';
import { authSlice } from './auth.slice';
import {
	ErrorHandler,
	IAuthorizateResponse,
	IBaseErrorState,
	IThrowerResponse,
} from '../Commons/reducer.commontypes';
import { IAccount } from './auth.types';
import {
	AuthorizateHeader,
	axiosHttp,
} from '../../../configurations/axios/axios';
import { DominoApi } from '../../../configurations/apis/DominoApi/domino.api';
import { AccountControllerMethods } from '../../../configurations/apis/DominoApi/domino.controllers';
import { LocalStorage } from '../../../configurations/localdbService/localdbService';
import {
	IStorageAuthorize,
	LocalStorageVariables,
} from '../../../configurations/localdbService/localdbService.types';

const AuthorizateByEmail =
	(_request: ILoginByEmailRequest) => async (dispatch: AppDispatch) => {
		try {
			dispatch(authSlice.actions.onLoading(true));
			const response: AxiosResponse<IAuthorizateResponse<IAccount>> =
				await axiosHttp.post<IAuthorizateResponse<IAccount>>(
					DominoApi.GetControllerPath(
						AccountControllerMethods.Root,
						AccountControllerMethods.Login
					),
					_request
				);
			if (response.data) {
				dispatch(authSlice.actions.onAuthorize(response.data.instance));
				LocalStorage.Authorize({
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
				} as IStorageAuthorize);
			}
		} catch (error) {
			const errorHandled: IBaseErrorState<IThrowerResponse> =
				ErrorHandler(error);
			dispatch(authSlice.actions.onError(errorHandled));
			throw errorHandled;
		}
	};

const RefreshToken =
	(_request: IAuthenticateUserRequest) => async (dispatch: AppDispatch) => {
		try {
			dispatch(authSlice.actions.onLoading(true));
			const response: AxiosResponse<IAuthorizateResponse<IAccount>> =
				await axiosHttp.post<IAuthorizateResponse<IAccount>>(
					DominoApi.GetControllerPath(
						AccountControllerMethods.Root,
						AccountControllerMethods.Refresh
					),
					_request
				);
			if (response.data) {
				dispatch(authSlice.actions.onAuthorize(response.data.instance));
				LocalStorage.Authorize({
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
				} as IStorageAuthorize);
			}
		} catch (error) {
			const errorHandled: IBaseErrorState<IThrowerResponse> =
				ErrorHandler(error);
			dispatch(authSlice.actions.onError(errorHandled));
			throw errorHandled;
		}
	};

const GetAuthorized = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(authSlice.actions.onLoading(true));
		const token = LocalStorage.GetValue(LocalStorageVariables.access_token);
		if (token && token.length > 0) {
			const response: AxiosResponse<IAccount> = await axiosHttp.get<IAccount>(
				DominoApi.GetControllerPath(
					AccountControllerMethods.Root,
					AccountControllerMethods.Authority
				),
				AuthorizateHeader(token)
			);
			if (response.data) {
				dispatch(authSlice.actions.onAuthorize(response.data));
			}
		}
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(authSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};

const RevokeAuthorizate = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(authSlice.actions.onLoading(true));
		const token = LocalStorage.GetValue(LocalStorageVariables.access_token);
		if (token && token.length > 0) {
			await axiosHttp.put<any>(
				DominoApi.GetControllerPath(
					AccountControllerMethods.Root,
					AccountControllerMethods.Revoke
				),
				{},
				AuthorizateHeader(token)
			);
			dispatch(authSlice.actions.onRevoke());
			LocalStorage.RevokeAuthorize();
		}
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(authSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};

export const ApiAccountAction = {
	AuthorizateByEmail: (_request: ILoginByEmailRequest) =>
		AuthorizateByEmail(_request),
	RefreshToken: (_request: IAuthenticateUserRequest) => RefreshToken(_request),
	GetAuthorized: () => GetAuthorized(),
	RevokeAuthorizate: () => RevokeAuthorizate(),
};
