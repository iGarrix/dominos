export interface IPizzaCard {
	title: string;
	description: string;
	price: number;
	discount: number;
	src: string;
	size: string;
	stars: number;
	available?: boolean;
	onCard?: () => void;
	onNav?: () => void;
}
