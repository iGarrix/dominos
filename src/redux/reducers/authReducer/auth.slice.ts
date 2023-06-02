import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAccount, IAuthState } from './auth.types';
import {
	IBaseErrorState,
	IThrowerResponse,
} from '../Commons/reducer.commontypes';
import { LocalStorage } from '../../../configurations/localdbService/localdbService';

const authState: IAuthState = {
	authorized: null,
	isLoad: false,
	error: null,
};

export const authSlice = createSlice({
	name: 'Auth',
	initialState: authState,
	reducers: {
		onAuthorize(state: IAuthState, action: PayloadAction<IAccount>) {
			state.authorized = action.payload;
			state.error = null;
			state.isLoad = false;
		},
		onRevoke(state: IAuthState) {
			state.authorized = null;
			state.error = null;
			state.isLoad = false;
		},
		onError(
			state: IAuthState,
			action: PayloadAction<IBaseErrorState<IThrowerResponse>>
		) {
			state.error = action.payload;
			state.isLoad = false;
		},
		onLoading(state: IAuthState, action: PayloadAction<boolean>) {
			state.isLoad = action.payload;
		},
	},
});

export const authReducer = authSlice.reducer;
