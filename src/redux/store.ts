import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { basicReducer } from './reducers/basicReducer/basic.slice';
import { pizzaReducer } from './reducers/pizzaReducer/pizza.slice';
import { orderReducer } from './reducers/orderReducer/order.slice';
import { authReducer } from './reducers/authReducer/auth.slice';

const rootReducer = combineReducers({
	basicReducer: basicReducer,
	pizzaReducer: pizzaReducer,
	orderReducer: orderReducer,
	authReducer: authReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
