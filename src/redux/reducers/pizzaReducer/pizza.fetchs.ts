export interface IFilterPizzaRequest {
	search: string;
	sorting: string;
	sizeofpizza: string;
	ingradients: string;
	page: number;
	take: number;
}

export interface ICreatePizzaRequest {
	title: string;
	ingradients: string;
	price: number;
	discount: number;
	size: string;
	stars: number;
	typeofpizza: string;
	image: string;
	available: boolean;
}

export interface IEditPizzaRequest {
	pizzaFindKey: string;
	dataObject: ICreatePizzaRequest;
}
