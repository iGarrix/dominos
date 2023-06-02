export interface ICartCard {
	title: string;
	image: string;
	price: number;
	discount: number;
	merchant: string;
	loadPayment: (payData: any) => void;
}
