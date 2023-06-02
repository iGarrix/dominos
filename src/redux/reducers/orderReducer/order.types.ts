import {
	BineResponse,
	IBaseReducerState,
} from '../Commons/reducer.commontypes';
import { IPizza } from '../basicReducer/basic.types';
import * as Yup from 'yup';

export interface IOrderState extends IBaseReducerState {
	findOrders: IFindOrders | null;
}

export interface IOrderSimplyfied {
	email: string;
	name: string;
	address1: string;
	address2: string;
	area: string;
	cardDetail: string;
	cardNetwork: string;
}

export interface IFindOrders {
	orderSimplyfied: IOrderSimplyfied;
	pizzas: BineResponse<IPizza>;
}

export interface IEmailFormik {
	email: string;
}

// Schemes

export const ValidEmail = Yup.object({
	email: Yup.string().email('Email is invalid').required('Email is required'),
});
