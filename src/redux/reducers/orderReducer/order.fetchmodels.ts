export interface ICreateOrderRequest {
	email: string;
	name: string;
	address1: string;
	address2: string;
	area: string;
	cardDetail: string;
	cardNetwork: string;
	total: number;
	pizzaTitle: string;
}

export interface ICreateCartOrderRequest {
	email: string;
	name: string;
	address1: string;
	address2: string;
	area: string;
	cardDetail: string;
	cardNetwork: string;
	total: number;
	pizzasTitle: Array<string>;
}

export interface IFindOrderRequest {
	email: string;
	page: number;
	take: number;
}
