import { IBaseReducerState } from '../Commons/reducer.commontypes';
import * as Yup from 'yup';

export interface IAuthState extends IBaseReducerState {
	authorized: IAccount | null;
}

export interface IAccount {
	userName: string;
	email: string;
}

// Scheme

export const LoginByEmailScheme = Yup.object({
	email: Yup.string().email('Email is invalid').required('Email is required'),
	password: Yup.string()
		.min(8, 'Password has no enought lenght, you must entered 8 characters')
		.required('Password is required'),
});
