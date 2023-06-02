export interface IHistoryCard {
	title: string;
	description: string;
	price: number;
	discount: number;
	src: string;
	size: string;
	stars: number;
	available?: boolean;
	onNav?: () => void;
}
