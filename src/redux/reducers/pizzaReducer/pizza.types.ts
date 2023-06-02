import {
	BineResponse,
	IBaseReducerState,
} from '../Commons/reducer.commontypes';
import { IPizza } from '../basicReducer/basic.types';
import * as Yup from 'yup';

export interface IPizzaState extends IBaseReducerState {
	latestPizzas: Array<IPizza> | null;
	discountPizzas: Array<IPizza> | null;
	allPizza: BineResponse<IPizza> | null;
	selectedPizza: IPizza | null;
}

// Models

export interface IFindFilterFormik {
	find: string;
}

export interface IEditPizzaFormik {
	img: string;
	title: string;
	price: string;
	discount: string;
}

export const ValidFindFilter = Yup.object({
	find: Yup.string(),
});

export const ValidEditPizza = Yup.object({
	img: Yup.string(),
	title: Yup.string(),
	price: Yup.number().min(20, 'That price is too little'),
	discount: Yup.number()
		.min(0, 'That discount is too little')
		.max(100, 'That discount was overflowed'),
});
