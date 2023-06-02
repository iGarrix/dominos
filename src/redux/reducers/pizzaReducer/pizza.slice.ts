import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPizzaState } from './pizza.types';
import {
	BineResponse,
	IBaseErrorState,
	IThrowerResponse,
} from '../Commons/reducer.commontypes';
import { IPizza } from '../basicReducer/basic.types';

const pizzaState: IPizzaState = {
	latestPizzas: null,
	discountPizzas: null,
	allPizza: null,
	selectedPizza: null,
	isLoad: false,
	error: null,
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState: pizzaState,
	reducers: {
		onSetAllPizza(
			state: IPizzaState,
			action: PayloadAction<BineResponse<IPizza>>
		) {
			state.allPizza = action.payload;
			state.error = null;
			state.isLoad = false;
		},
		onEmptyFilter(
			state: IPizzaState,
			action: PayloadAction<IBaseErrorState<IThrowerResponse>>
		) {
			if (state.allPizza) {
				state.allPizza.dataSet = [];
				state.error = action.payload;
				state.isLoad = false;
			}
		},
		onSetLatest(state: IPizzaState, action: PayloadAction<Array<IPizza>>) {
			state.latestPizzas = action.payload;
			state.error = null;
			state.isLoad = false;
		},
		onSetDiscount(state: IPizzaState, action: PayloadAction<Array<IPizza>>) {
			state.discountPizzas = action.payload;
			state.error = null;
			state.isLoad = false;
		},
		onSetSelectPizza(state: IPizzaState, action: PayloadAction<IPizza>) {
			state.selectedPizza = action.payload;
			state.isLoad = false;
			state.error = null;
		},
		onError(
			state: IPizzaState,
			action: PayloadAction<IBaseErrorState<IThrowerResponse>>
		) {
			state.error = action.payload;
			state.isLoad = false;
		},
		onLoading(state: IPizzaState, action: PayloadAction<boolean>) {
			state.isLoad = action.payload;
		},
		onDispose(state: IPizzaState) {
			state.allPizza = null;
			(state.latestPizzas = null),
				(state.discountPizzas = null),
				(state.isLoad = false);
			state.selectedPizza = null;
			state.error = null;
		},
	},
});

export const pizzaReducer = pizzaSlice.reducer;
