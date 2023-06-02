import { AxiosResponse } from 'axios';
import { DominoApi } from '../../../configurations/apis/DominoApi/domino.api';
import { OrderControllerMethods } from '../../../configurations/apis/DominoApi/domino.controllers';
import { AppDispatch } from '../../store';
import {
	ErrorHandler,
	IBaseErrorState,
	IThrowerResponse,
} from '../Commons/reducer.commontypes';
import {
	ICreateCartOrderRequest,
	ICreateOrderRequest,
	IFindOrderRequest,
} from './order.fetchmodels';
import { orderSlice } from './order.slice';
import { IFindOrders } from './order.types';
import { axiosHttp } from '../../../configurations/axios/axios';

const CreateOrder =
	(_request: ICreateOrderRequest) => async (dispatch: AppDispatch) => {
		try {
			dispatch(orderSlice.actions.onLoading(true));

			await axiosHttp.post<any>(
				DominoApi.GetControllerPath(
					OrderControllerMethods.Root,
					OrderControllerMethods.CreateOrder
				),
				_request
			);
			dispatch(orderSlice.actions.onLoading(false));
		} catch (error) {
			const errorHandled: IBaseErrorState<IThrowerResponse> =
				ErrorHandler(error);
			dispatch(orderSlice.actions.onError(errorHandled));
			throw errorHandled;
		}
	};

const CreateCartOrder =
	(_request: ICreateCartOrderRequest) => async (dispatch: AppDispatch) => {
		try {
			dispatch(orderSlice.actions.onLoading(true));

			await axiosHttp.post<any>(
				DominoApi.GetControllerPath(
					OrderControllerMethods.Root,
					OrderControllerMethods.CreateCartOrder
				),
				_request
			);
			dispatch(orderSlice.actions.onLoading(false));
		} catch (error) {
			const errorHandled: IBaseErrorState<IThrowerResponse> =
				ErrorHandler(error);
			dispatch(orderSlice.actions.onError(errorHandled));
			throw errorHandled;
		}
	};

const FindOrders =
	(_request: IFindOrderRequest) => async (dispatch: AppDispatch) => {
		try {
			dispatch(orderSlice.actions.onLoading(true));

			const response: AxiosResponse<IFindOrders> =
				await axiosHttp.get<IFindOrders>(
					DominoApi.GetControllerPath(
						OrderControllerMethods.Root,
						OrderControllerMethods.GetOrders
					),
					{
						params: {
							email: _request.email,
							page: _request.page,
							take: _request.take,
						},
					}
				);
			if (response.data) {
				dispatch(orderSlice.actions.onSetFindOrders(response.data));
			}
		} catch (error) {
			const errorHandled: IBaseErrorState<IThrowerResponse> =
				ErrorHandler(error);
			dispatch(orderSlice.actions.onError(errorHandled));
			throw errorHandled;
		}
	};
export const ApiOrderAction = {
	CreateOrder: (_request: ICreateOrderRequest) => CreateOrder(_request),
	CreateCartOrder: (_request: ICreateCartOrderRequest) =>
		CreateCartOrder(_request),
	FindOrders: (_request: IFindOrderRequest) => FindOrders(_request),
};
