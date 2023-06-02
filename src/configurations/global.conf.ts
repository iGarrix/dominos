export {};

export interface IIngradient {
	title: string;
	description: string;
	type: string;
	src: string;
	cost?: number;
}

export class FetchLimits {
	public static pizza_fetch_limit = 50;
	public static history_fetch_limit = 20;
}

export const ingradients: Array<IIngradient> = [
	{
		title: 'Gauda',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://nssz.com.ua/image/catalog/products_description/vershkoviy/vershkoviy.png',
	},
	{
		title: 'Bri',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://images.prom.ua/1795052726_sir-bri-la.jpg',
	},
	{
		title: 'Parmesan',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://free-png.ru/wp-content/uploads/2022/06/free-png.ru-638-340x300.png',
	},
	{
		title: 'Cream cheese',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://content.fora.ua/sku/ecommerce/71/545x440wwm/712457_545x440wwm_87866529-4e71-c6ac-bae5-ba1e2e47e74e.png',
	},
	{
		title: 'Chilli',
		type: 'Pepper',
		description: 'The most acute pepper',
		src: 'https://pngimg.com/d/chili_pepper_PNG15.png',
	},
	{
		title: 'Bulgarian',
		type: 'Pepper',
		description: 'It`s a light acute pepper',
		src: 'https://www.georgeperry.co.uk/images/P/peppers.jpg',
	},
	{
		title: 'Ordinary',
		type: 'Chicken',
		description: 'It`s a ordinary chicken from the farm',
		src: 'https://pngimg.com/d/fried_chicken_PNG97927.png',
	},
	{
		title: 'Turkey',
		type: 'Chicken',
		description: 'It`s a ordinary turkey from the farm',
		src: 'https://freepngimg.com/save/24509-turkey-transparent-background/900x489',
	},
	{
		title: 'Bavarian',
		type: 'Meat',
		description: 'Only natural bavarian meat from the farm',
		src: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Bavaria2022.png',
	},
	{
		title: 'Pepperoni',
		type: 'Meat',
		description: 'Only natural pepperoni meat from the farm',
		src: 'https://media.istockphoto.com/id/681723434/photo/chorizo-sausage-slice-isolated-on-white.jpg?s=612x612&w=0&k=20&c=MSexpEKdxq-7opTa79r8rTVa88pL91P7JGP1bs1wMWg=',
	},
	{
		title: 'Becon',
		type: 'Meat',
		description: 'Only natural becon meat from the farm',
		src: 'https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png',
	},
	{
		title: 'Chorizo',
		type: 'Meat',
		description: 'Only natural chorizo meat from the farm',
		src: 'https://e7.pngegg.com/pngimages/693/318/png-clipart-salami-spanish-cuisine-bacon-chorizo-meat-sausage-food-photography.png',
	},
	{
		title: 'Ham',
		type: 'Meat',
		description: 'Only natural ham meat from the farm',
		src: 'https://pics.clipartpng.com/Ham_PNG_Clipart-330.png',
	},
	{
		title: 'Veal (Beef)',
		type: 'Meat',
		description: 'Only natural beef meat from the farm',
		src: 'https://www.pngall.com/wp-content/uploads/2/Beef-PNG-High-Quality-Image.png',
	},
	{
		title: 'Meatballs',
		type: 'Meat',
		description: 'Only natural meatballs from the farm',
		src: 'https://www.pngarts.com/files/1/Meatball-Transparent-Background-PNG.gif',
	},
	{
		title: 'Red tomato',
		type: 'Vegetable',
		description: 'Natural product from the domino`s farm',
		src: 'https://imgpng.ru/d/tomato_PNG12510.png',
	},
	{
		title: 'Cherry',
		type: 'Vegetable',
		description: 'Natural product from the domino`s farm',
		src: 'https://eda.ru/img/eda/c464x302/s1.eda.ru/StaticContent/Photos/120328144247/120329174137/p_O.jpg',
	},
	{
		title: 'Sweet',
		type: 'Vegetable',
		description: 'Size mini cucumbers',
		src: 'https://mucci-production-user-uploads-bucket.s3.amazonaws.com/images/Product-IMG_MiniCucumbers-rev2.original.png',
	},
	{
		title: 'Salty',
		type: 'Vegetable',
		description: 'Size large salty cucumbers',
		src: 'https://pngimg.com/d/cucumber_PNG84274.png',
	},
	{
		title: 'Ordinary',
		type: 'Vegetable',
		description: 'It`s a ordinary olives from the farm',
		src: 'https://www.pngall.com/wp-content/uploads/4/Olive-Transparent.png',
	},
	{
		title: 'Black',
		type: 'Vegetable',
		description: 'It`s a big black olives from the farm',
		src: 'https://atlas-content-cdn.pixelsquid.com/stock-images/bowl-with-black-olives-olive-o0LBzDD-600.jpg',
	},
	{
		title: 'White mushrooms',
		type: 'Vegetable',
		description: 'Natural mushrooms from forest',
		src: 'https://images.squarespace-cdn.com/content/v1/53f75646e4b04ee49aa16788/1444250350645-VNXNVZBDLH89E1ARPSS3/white.png?format=1000w',
	},
	{
		title: 'Banana',
		type: 'Fruit',
		description: 'Natural bananas from the palms',
		src: 'https://png.pngtree.com/png-clipart/20220716/ourmid/pngtree-banana-yellow-fruit-banana-skewers-png-image_5944324.png',
	},
	{
		title: 'Pineapply',
		type: 'Fruit',
		description: 'Natural pineapple',
		src: 'https://www.pngall.com/wp-content/uploads/2016/05/Pineapple-Free-Download-PNG.png',
	},
	{
		title: 'Apple',
		type: 'Fruit',
		description: 'Natural apple from the trees',
		src: 'https://static.vecteezy.com/system/resources/previews/008/848/360/original/fresh-apple-fruit-free-png.png',
	},
	{
		title: 'Chilli',
		type: 'Sause',
		description: 'It`s the strongest sause from us',
		src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsi4tdaRNTLOBfRW6DUC3U-zD7czSIpLFknTcd6JXsFPw7mbffIoK9xG_4Mlp_Gi7U9MY&usqp=CAU',
	},
	{
		title: 'Alfredo',
		type: 'Sause',
		description: 'Weak sause for pizza',
		src: 'https://www.bertolli.com/wp-content/uploads/2022/06/bertolli-ditalia-alfredo-sauce-w-whiite-wine.png',
	},
	{
		title: 'Barbeque',
		type: 'Sause',
		description: 'Barbeque sause for pizza',
		src: 'https://d1906a8c873b5d638f11-66fd139e67371687450909048768944b.ssl.cf2.rackcdn.com/0013409918100_CR_Syndigo_default_large.png',
	},
	{
		title: 'Garlic',
		type: 'Sause',
		description: 'Garlic sause for pizza',
		src: 'https://media.istockphoto.com/id/185952890/photo/bowl-of-fresh-garlic-dip.jpg?s=612x612&w=0&k=20&c=hjKMXons7Stxd-5d3XPJMh_b7zAyBkhIrd0nRydwqbY=',
	},
	{
		title: 'Tabasko',
		type: 'Sause',
		description: 'Tabasco - one of the strongest sause for pizza in the world',
		src: 'https://www.tabasco.com/wp-content/uploads/2017/04/TABASCO-Original-Red-5oz-Bottle.png',
	},
];

export const meat_ingradients: Array<IIngradient> = [
	{
		title: 'Bavarian',
		type: 'Meat',
		description: 'Only natural bavarian meat from the farm',
		src: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Bavaria2022.png',
	},
	{
		title: 'Pepperoni',
		type: 'Meat',
		description: 'Only natural pepperoni meat from the farm',
		src: 'https://media.istockphoto.com/id/681723434/photo/chorizo-sausage-slice-isolated-on-white.jpg?s=612x612&w=0&k=20&c=MSexpEKdxq-7opTa79r8rTVa88pL91P7JGP1bs1wMWg=',
	},
	{
		title: 'Becon',
		type: 'Meat',
		description: 'Only natural becon meat from the farm',
		src: 'https://i.pinimg.com/originals/99/52/01/995201e1c92ca9eced42364ed8a1892c.png',
	},
	{
		title: 'Chorizo',
		type: 'Meat',
		description: 'Only natural chorizo meat from the farm',
		src: 'https://e7.pngegg.com/pngimages/693/318/png-clipart-salami-spanish-cuisine-bacon-chorizo-meat-sausage-food-photography.png',
	},
	{
		title: 'Ham',
		type: 'Meat',
		description: 'Only natural ham meat from the farm',
		src: 'https://pics.clipartpng.com/Ham_PNG_Clipart-330.png',
	},
	{
		title: 'Veal (Beef)',
		type: 'Meat',
		description: 'Only natural beef meat from the farm',
		src: 'https://www.pngall.com/wp-content/uploads/2/Beef-PNG-High-Quality-Image.png',
	},
	{
		title: 'Meatballs',
		type: 'Meat',
		description: 'Only natural meatballs from the farm',
		src: 'https://www.pngarts.com/files/1/Meatball-Transparent-Background-PNG.gif',
	},
];

export const vegetable_ingradients: Array<IIngradient> = [
	{
		title: 'Red tomato',
		type: 'Vegetable',
		description: 'Natural product from the domino`s farm',
		src: 'https://imgpng.ru/d/tomato_PNG12510.png',
	},
	{
		title: 'Cherry',
		type: 'Vegetable',
		description: 'Natural product from the domino`s farm',
		src: 'https://eda.ru/img/eda/c464x302/s1.eda.ru/StaticContent/Photos/120328144247/120329174137/p_O.jpg',
	},
	{
		title: 'Sweet',
		type: 'Vegetable',
		description: 'Size mini cucumbers',
		src: 'https://mucci-production-user-uploads-bucket.s3.amazonaws.com/images/Product-IMG_MiniCucumbers-rev2.original.png',
	},
	{
		title: 'Salty',
		type: 'Vegetable',
		description: 'Size large salty cucumbers',
		src: 'https://pngimg.com/d/cucumber_PNG84274.png',
	},
	{
		title: 'Ordinary',
		type: 'Vegetable',
		description: 'It`s a ordinary olives from the farm',
		src: 'https://www.pngall.com/wp-content/uploads/4/Olive-Transparent.png',
	},
	{
		title: 'Black',
		type: 'Vegetable',
		description: 'It`s a big black olives from the farm',
		src: 'https://atlas-content-cdn.pixelsquid.com/stock-images/bowl-with-black-olives-olive-o0LBzDD-600.jpg',
	},
	{
		title: 'White mushrooms',
		type: 'Vegetable',
		description: 'Natural mushrooms from forest',
		src: 'https://images.squarespace-cdn.com/content/v1/53f75646e4b04ee49aa16788/1444250350645-VNXNVZBDLH89E1ARPSS3/white.png?format=1000w',
	},
];

export const sause_ingradients: Array<IIngradient> = [
	{
		title: 'Chilli',
		type: 'Pepper',
		description: 'The most acute pepper',
		src: 'https://pngimg.com/d/chili_pepper_PNG15.png',
	},
	{
		title: 'Alfredo',
		type: 'Sause',
		description: 'Weak sause for pizza',
		src: 'https://www.bertolli.com/wp-content/uploads/2022/06/bertolli-ditalia-alfredo-sauce-w-whiite-wine.png',
	},
	{
		title: 'Barbeque',
		type: 'Sause',
		description: 'Barbeque sause for pizza',
		src: 'https://d1906a8c873b5d638f11-66fd139e67371687450909048768944b.ssl.cf2.rackcdn.com/0013409918100_CR_Syndigo_default_large.png',
	},
	{
		title: 'Garlic',
		type: 'Sause',
		description: 'Garlic sause for pizza',
		src: 'https://media.istockphoto.com/id/185952890/photo/bowl-of-fresh-garlic-dip.jpg?s=612x612&w=0&k=20&c=hjKMXons7Stxd-5d3XPJMh_b7zAyBkhIrd0nRydwqbY=',
	},
	{
		title: 'Tabasko',
		type: 'Sause',
		description: 'Tabasco - one of the strongest sause for pizza in the world',
		src: 'https://www.tabasco.com/wp-content/uploads/2017/04/TABASCO-Original-Red-5oz-Bottle.png',
	},
];

export const cheese_ingradients: Array<IIngradient> = [
	{
		title: 'Gauda',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://nssz.com.ua/image/catalog/products_description/vershkoviy/vershkoviy.png',
	},
	{
		title: 'Bri',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://images.prom.ua/1795052726_sir-bri-la.jpg',
	},
	{
		title: 'Parmesan',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://free-png.ru/wp-content/uploads/2022/06/free-png.ru-638-340x300.png',
	},
	{
		title: 'Cream cheese',
		type: 'Cheese',
		description: 'Natural product from the domino`s farm',
		src: 'https://content.fora.ua/sku/ecommerce/71/545x440wwm/712457_545x440wwm_87866529-4e71-c6ac-bae5-ba1e2e47e74e.png',
	},
];

export const fruit_ingradients: Array<IIngradient> = [
	{
		title: 'Banana',
		type: 'Fruit',
		description: 'Natural bananas from the palms',
		src: 'https://png.pngtree.com/png-clipart/20220716/ourmid/pngtree-banana-yellow-fruit-banana-skewers-png-image_5944324.png',
	},
	{
		title: 'Pineapply',
		type: 'Fruit',
		description: 'Natural pineapple',
		src: 'https://www.pngall.com/wp-content/uploads/2016/05/Pineapple-Free-Download-PNG.png',
	},
	{
		title: 'Apple',
		type: 'Fruit',
		description: 'Natural apple from the trees',
		src: 'https://static.vecteezy.com/system/resources/previews/008/848/360/original/fresh-apple-fruit-free-png.png',
	},
];

export const pepper_ingradients: Array<IIngradient> = [
	{
		title: 'Chilli',
		type: 'Pepper',
		description: 'The most acute pepper',
		src: 'https://pngimg.com/d/chili_pepper_PNG15.png',
	},
	{
		title: 'Bulgarian',
		type: 'Pepper',
		description: 'It`s a light acute pepper',
		src: 'https://www.georgeperry.co.uk/images/P/peppers.jpg',
	},
];

export const chicken_ingradients: Array<IIngradient> = [
	{
		title: 'Ordinary',
		type: 'Chicken',
		description: 'It`s a ordinary chicken from the farm',
		src: 'https://pngimg.com/d/fried_chicken_PNG97927.png',
	},
	{
		title: 'Turkey',
		type: 'Chicken',
		description: 'It`s a ordinary turkey from the farm',
		src: 'https://freepngimg.com/save/24509-turkey-transparent-background/900x489',
	},
];
