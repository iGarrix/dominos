import { AxiosError } from 'axios';

export interface IBaseErrorState<TPropsType> {
	message: string | null;
	props: TPropsType | null;
}

export interface IBaseReducerState {
	isLoad: boolean;
	error: IBaseErrorState<any> | null;
}

export interface BineResponse<TBineDataType> {
	totalObj: number;
	totalPages: number;
	currentPage: number;
	nextPage: number | null;
	prevPage: number | null;
	takes: number;
	dataSet: Array<TBineDataType> | null;
}

export interface BineIncommingTypeProps {
	page: number;
	take: number;
}

export interface IThrowerResponse {
	StatusCode: number;
	Message: string;
}

export interface IAuthorizateResponse<TInstance> {
	refreshToken: string;
	accessToken: string;
	instance: TInstance;
}

// Actions

export function ErrorHandler(_error: any): IBaseErrorState<IThrowerResponse> {
	const axiosError: AxiosError = _error as AxiosError;
	if (axiosError) {
		const thrower: IThrowerResponse = axiosError.response
			?.data as IThrowerResponse;
		if (thrower) {
			const baseThrowerError: IBaseErrorState<IThrowerResponse> = {
				message: null,
				props: thrower,
			};
			return baseThrowerError;
		}
		const baseAxiosError: IBaseErrorState<any> = {
			message: axiosError.message,
			props: null,
		};
		return baseAxiosError;
	}
	const baseUnknownError: IBaseErrorState<IThrowerResponse> = {
		message: 'Unknown error',
		props: null,
	};
	return baseUnknownError;
}
