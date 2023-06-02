// Localstorage Service

import { object } from 'yup';
import {
	IStorageAuthorize,
	LocalStorageVariables,
} from './localdbService.types';

export class LocalStorage {
	public static DisposeStorage() {
		localStorage.clear();
	}

	public static CreateValue(_key: string, _object: any) {
		localStorage.setItem(_key, _object);
	}

	public static CreateValueAsType<T>(_key: string, _object: T) {
		localStorage.setItem(_key, JSON.stringify(_object));
	}

	public static GetValue(_variable: LocalStorageVariables | string): string {
		const findVariable = localStorage.getItem(_variable);
		if (findVariable) {
			return findVariable;
		}
		//localStorage.setItem(_variable, "");
		return '';
	}

	public static GetValueAsType<VariableType>(
		_variable: LocalStorageVariables | string
	): VariableType | null {
		const findVariable = localStorage.getItem(_variable);
		if (findVariable) {
			const typizate: VariableType = JSON.parse(findVariable) as VariableType;
			return typizate;
		}
		//localStorage.setItem(_variable, "");
		return null;
	}

	public static DeleteValue(_key: string) {
		localStorage.removeItem(_key);
	}

	public static DeleteListValue(..._listValues: string[]) {
		_listValues.map((value: string) => {
			this.DeleteValue(value);
		});
	}

	public static Authorize(_authorizeData: IStorageAuthorize) {
		localStorage.setItem(
			LocalStorageVariables.access_token,
			_authorizeData.accessToken
		);
		localStorage.setItem(
			LocalStorageVariables.refresh_token,
			_authorizeData.refreshToken
		);
	}

	public static IsAuthorize(): boolean {
		const accessToken = localStorage.getItem(
			LocalStorageVariables.access_token
		);
		const refreshToken = localStorage.getItem(
			LocalStorageVariables.refresh_token
		);

		if (accessToken && refreshToken) {
			return true;
		}
		return false;
	}

	public static RevokeAuthorize() {
		const accessToken = localStorage.getItem(
			LocalStorageVariables.access_token
		);
		const refreshToken = localStorage.getItem(
			LocalStorageVariables.refresh_token
		);

		localStorage.removeItem(LocalStorageVariables.access_token);
		localStorage.removeItem(LocalStorageVariables.refresh_token);
	}
}
