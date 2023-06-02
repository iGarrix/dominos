import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBasicState, IPizza } from './basic.types';
import { IBaseErrorState } from '../Commons/reducer.commontypes';
import { CartHelper } from '../../../configurations/cart.helper';

const basicState: IBasicState = {
	cart: null,
	isLoad: false,
	basicLoading: false,
	error: null,
};

export const basicSlice = createSlice({
	name: 'basic',
	initialState: basicState,
	reducers: {
		onSetCard(state: IBasicState, action: PayloadAction<Array<IPizza>>) {
			state.cart = action.payload;
			state.error = null;
			state.isLoad = false;

			CartHelper.setCartItems(CartHelper.variable, state.cart);
		},
		onAddObject(state: IBasicState, action: PayloadAction<IPizza>) {
			if (state.cart) {
				if (state.cart.find(e => e.title === action.payload.title)) {
					state.error = null;
					state.isLoad = false;
					return;
				}

				state.cart = [...state.cart, action.payload];
			} else {
				state.cart = [action.payload];
			}
			state.error = null;
			state.isLoad = false;

			CartHelper.setCartItems(CartHelper.variable, state.cart);
		},
		onRemoveObject(state: IBasicState, action: PayloadAction<IPizza>) {
			const newCart = state.cart?.filter(f => f.key !== action.payload.key);
			if (newCart) {
				state.cart = newCart;
				CartHelper.setCartItems(CartHelper.variable, state.cart);
			}
			if (state.cart && state.cart.length === 0) {
				state.cart = null;
				CartHelper.disposeCard();
			}
		},
		onError(state: IBasicState, action: PayloadAction<IBaseErrorState<any>>) {
			state.error = action.payload;
		},
		onLoading(state: IBasicState, action: PayloadAction<boolean>) {
			state.isLoad = action.payload;
		},
		onBasicLoading(state: IBasicState, action: PayloadAction<boolean>) {
			state.basicLoading = action.payload;
		},
		onDispose(state: IBasicState) {
			state.cart = null;
			state.error = null;
			state.isLoad = false;
			state.basicLoading = false;

			CartHelper.disposeCard();
		},
	},
});

export const basicReducer = basicSlice.reducer;
