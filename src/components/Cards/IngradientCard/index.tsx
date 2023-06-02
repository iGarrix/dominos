import style from './ingradientCard.module.scss';
import { IIngradientCard } from './ingradientcard.types';

export const IngradientCard: React.FC<IIngradientCard> = ({ ...props }) => {
	function GetPrimaryColor(type: string) {
		switch (type) {
			case 'Cheese':
				return 'bg-sun-200';
			case 'Fruit':
				return 'bg-lavander';
			case 'Pepper':
				return 'bg-grapefruit';
			case 'Sause':
				return 'bg-bittersweet';
			case 'Chicken':
				return 'bg-bittersweet';
			case 'Meat':
				return 'bg-grapefruit';
			case 'Vegetable':
				return 'bg-grass';

			default:
				return 'bg-dark';
		}
	}

	return (
		<div key={props.index} className={style.cardWrap}>
			<div className={style.cardSubwrap}>
				<img
					src={props.ingradient.src}
					alt="ingradientimage"
					className={style.imgcard}
				/>
				<div className={style.cardcontent}>
					<div
						className={`${GetPrimaryColor(props.ingradient.type)} ${
							style.type
						}`}
					>
						{props.ingradient.type}
					</div>
					<div className={style.wrapctx}>
						<h1 className={style.titlecard}>{props.ingradient.title}</h1>
						<p className={style.desccard}>{props.ingradient.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
