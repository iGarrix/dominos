/* eslint-disable prefer-const */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFindOrders, IOrderState } from './order.types';
import {
	IBaseErrorState,
	IThrowerResponse,
} from '../Commons/reducer.commontypes';
import { IPizza } from '../basicReducer/basic.types';

const orderState: IOrderState = {
	findOrders: null,
	isLoad: false,
	error: null,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState: orderState,
	reducers: {
		onSetFindOrders(state: IOrderState, action: PayloadAction<IFindOrders>) {
			state.findOrders = action.payload;
			state.isLoad = false;
			state.error = null;
		},
		onError(
			state: IOrderState,
			action: PayloadAction<IBaseErrorState<IThrowerResponse>>
		) {
			state.error = action.payload;
			state.isLoad = false;
		},
		onLoading(state: IOrderState, action: PayloadAction<boolean>) {
			state.isLoad = action.payload;
		},
		onDispose(state: IOrderState) {
			state.findOrders = null;
			state.isLoad = false;
			state.error = null;
		},
	},
});

export const orderReducer = orderSlice.reducer;
