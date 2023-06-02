import { IBaseReducerState } from '../Commons/reducer.commontypes';

export interface IBasicState extends IBaseReducerState {
	cart: Array<IPizza> | null;
	basicLoading: boolean;
}

// Models

export interface IPizza {
	key: string;
	title: string;
	ingradients: string;
	price: number;
	discount: number;
	stars: number;
	typeofpizza: string;
	size: string;
	image: string;
	available: boolean;
	createTime?: Date;
	modifyTime?: Date;
}
