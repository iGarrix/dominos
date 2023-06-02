import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './pizzacard.module.scss';
import { faHryvniaSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { IPizzaCard } from './pizzacard.types';
import { DominoApi } from '../../../configurations/apis/DominoApi/domino.api';

export const PizzaCard: React.FC<IPizzaCard> = ({
	available = true,
	...props
}) => {
	function onHandleProps() {
		if (available && props.onCard) {
			props.onCard();
		}
	}

	return (
		<div className={style.pizzacard}>
			{props.discount > 0 && (
				<div className="absolute top-0 right-0 bg-grapefruit px-[1rem] text-white -skew-x-3">
					-{props.discount}%
				</div>
			)}
			<div
				className="px-[2rem] py-[0.5rem] relative cursor-pointer"
				onClick={props.onNav}
			>
				<img
					src={props.src}
					alt="pizza"
					className="w-[220px] object-contain mix-blend-multiply"
				/>
			</div>
			<div
				className="flex flex-col w-full h-full items-center flex-wrap pb-[1rem] gap-3 cursor-pointer"
				onClick={props.onNav}
			>
				<h1 className="uppercase font-bold text-lg tracking-wider text-center">
					{props.title}
				</h1>
				<p className="text-center whitespace-pre-line px-[5%] text-center">
					{props.description}
				</p>
				<p className="text-center text-grapefruit text-xl mt-auto flex items-center gap-[1rem]">
					<span>
						{DominoApi.PriceWithDiscount(props.price, props.discount)}{' '}
						<FontAwesomeIcon icon={faHryvniaSign} />
					</span>
					<span className="uppercase">{props.size}</span>
				</p>
				<div className="flex w-full justify-center items-center gap-1">
					{[...Array(6)].map((item, index) => {
						return (
							<FontAwesomeIcon
								key={index}
								icon={faStar}
								className={`${index < props.stars ? 'text-sun' : 'text-light'}`}
							/>
						);
					})}
				</div>
			</div>
			<button
				disabled={!available}
				className="bg-grapefruit text-white text-center uppercase text-sm font-sans w-full py-[1rem] transition-all hover:bg-grapefruit-200 hover:text-light"
				onClick={onHandleProps}
			>
				{available ? 'Add to card' : 'Not available'}
			</button>
		</div>
	);
};
