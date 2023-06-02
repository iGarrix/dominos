import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { DominoApi } from '../../../configurations/apis/DominoApi/domino.api';
import { LocalStorage } from '../../../configurations/localdbService/localdbService';

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const { authorized } = useAppSelector(state => state.authReducer);
	const { GetAuthorized, RevokeAuthorizate } =
		DominoApi.Controllers.AuthController;

	async function AuthorizeAsync() {
		await dispatch(GetAuthorized());
	}

	async function RevokeAsync() {
		dispatch(RevokeAuthorizate());
	}

	useEffect(() => {
		if (LocalStorage.IsAuthorize()) {
			AuthorizeAsync();
		}
	}, []);

	function GetProtect(): boolean {
		return authorized != null || LocalStorage.IsAuthorize() === true;
	}

	return { GetProtect, AuthorizeAsync, RevokeAsync };
};
