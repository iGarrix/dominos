/* eslint-disable prefer-const */
import { AxiosResponse } from 'axios';
import { DominoApi } from '../../../configurations/apis/DominoApi/domino.api';
import { PizzaControllerMethods } from '../../../configurations/apis/DominoApi/domino.controllers';
import {
	AuthorizateHeader,
	axiosHttp,
} from '../../../configurations/axios/axios';
import { AppDispatch } from '../../store';
import {
	BineResponse,
	ErrorHandler,
	IBaseErrorState,
	IThrowerResponse,
} from '../Commons/reducer.commontypes';
import { IPizza } from '../basicReducer/basic.types';
import { pizzaSlice } from './pizza.slice';
import { IEditPizzaRequest, IFilterPizzaRequest } from './pizza.fetchs';
import { LocalStorage } from '../../../configurations/localdbService/localdbService';
import { LocalStorageVariables } from '../../../configurations/localdbService/localdbService.types';

const GetLatestPizza = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(pizzaSlice.actions.onLoading(true));
		const response: AxiosResponse<Array<IPizza>> = await axiosHttp.get<
			Array<IPizza>
		>(
			DominoApi.GetControllerPath(
				PizzaControllerMethods.Root,
				PizzaControllerMethods.GetLatest
			)
		);
		if (response.data) {
			dispatch(pizzaSlice.actions.onSetLatest(response.data));
		}
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(pizzaSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};
const GetDiscountPizza = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(pizzaSlice.actions.onLoading(true));
		const response: AxiosResponse<Array<IPizza>> = await axiosHttp.get<
			Array<IPizza>
		>(
			DominoApi.GetControllerPath(
				PizzaControllerMethods.Root,
				PizzaControllerMethods.GetDiscount
			)
		);
		if (response.data) {
			dispatch(pizzaSlice.actions.onSetDiscount(response.data));
		}
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(pizzaSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};

const GetPizza = (id: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(pizzaSlice.actions.onLoading(true));
		const response: AxiosResponse<IPizza> = await axiosHttp.get<IPizza>(
			DominoApi.GetControllerPath(
				PizzaControllerMethods.Root,
				PizzaControllerMethods.GetPizza
			),
			{ params: { id: id } }
		);
		if (response.data) {
			dispatch(pizzaSlice.actions.onSetSelectPizza(response.data));
		}
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(pizzaSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};
const EditPizza =
	(_request: IEditPizzaRequest) => async (dispatch: AppDispatch) => {
		try {
			const token = LocalStorage.GetValue(LocalStorageVariables.access_token);
			if (token && token.length > 0) {
				dispatch(pizzaSlice.actions.onLoading(true));
				const response: AxiosResponse<IPizza> = await axiosHttp.put<IPizza>(
					DominoApi.GetControllerPath(
						PizzaControllerMethods.Root,
						PizzaControllerMethods.EditPizza
					),
					_request,
					AuthorizateHeader(token)
				);
				if (response.data) {
					dispatch(pizzaSlice.actions.onSetSelectPizza(response.data));
				}
			}
		} catch (error) {
			const errorHandled: IBaseErrorState<IThrowerResponse> =
				ErrorHandler(error);
			dispatch(pizzaSlice.actions.onError(errorHandled));
			throw errorHandled;
		}
	};

const DeletePizza = (id: string) => async (dispatch: AppDispatch) => {
	try {
		const token = LocalStorage.GetValue(LocalStorageVariables.access_token);
		if (token && token.length > 0) {
			dispatch(pizzaSlice.actions.onLoading(true));
			await axiosHttp.delete<boolean>(
				DominoApi.GetControllerPath(
					PizzaControllerMethods.Root,
					PizzaControllerMethods.DeletePizza
				),
				{ params: { id: id }, headers: AuthorizateHeader(token).headers }
			);
		}
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(pizzaSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};

const GetFilterPizza =
	(_request: IFilterPizzaRequest) => async (dispatch: AppDispatch) => {
		try {
			dispatch(pizzaSlice.actions.onLoading(true));
			const response: AxiosResponse<BineResponse<IPizza>> = await axiosHttp.get<
				BineResponse<IPizza>
			>(
				DominoApi.GetControllerPath(
					PizzaControllerMethods.Root,
					PizzaControllerMethods.GetAllPizza
				),
				{ params: _request }
			);
			if (response.data) {
				dispatch(pizzaSlice.actions.onSetAllPizza(response.data));
			}
		} catch (error) {
			const errorHandled: IBaseErrorState<IThrowerResponse> =
				ErrorHandler(error);
			let viewErrorHandler = errorHandled;
			viewErrorHandler.message = `Filtering '${errorHandled.props?.Message}' was error`;
			dispatch(pizzaSlice.actions.onEmptyFilter(viewErrorHandler));
			//dispatch(pizzaSlice.actions.onError(errorHandled));
			throw errorHandled;
		}
	};

export const ApiPizzaAction = {
	GetLatestPizza: () => GetLatestPizza(),
	GetDiscountPizza: () => GetDiscountPizza(),
	GetPizza: (id: string) => GetPizza(id),
	EditPizza: (_request: IEditPizzaRequest) => EditPizza(_request),
	GetFilterPizza: (_request: IFilterPizzaRequest) => GetFilterPizza(_request),
	DeletePizza: (id: string) => DeletePizza(id),
};
