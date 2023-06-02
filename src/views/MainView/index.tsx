import style from './mainview.module.scss';
import Marquee from 'react-fast-marquee';
import { Carousel } from '../../components/Carousel';
import { useEffect, useLayoutEffect, useState } from 'react';
import { SecondFrameCarousel } from '../../components/Carousel/Frames/SecondFrameCarousel';
import { FirstFrameCarousel } from '../../components/Carousel/Frames/FirstFrameCarousel';
import { ThirdFrameCarousel } from '../../components/Carousel/Frames/ThirdFrameCarousel';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DefButton } from '../../components/Buttons/DefButton';
import { PizzaCard } from '../../components/Cards/PizzaCard';
import { IPizza } from '../../redux/reducers/basicReducer/basic.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { ReduxBasicActions } from '../../redux/reducers/basicReducer/basic.actions';
import { DefToast } from '../../components/Toasts/DefToast';
import {
	IBaseErrorState,
	IThrowerResponse,
} from '../../redux/reducers/Commons/reducer.commontypes';
import { DominoApi } from '../../configurations/apis/DominoApi/domino.api';
import { pizzaSlice } from '../../redux/reducers/pizzaReducer/pizza.slice';

export const MainView: React.FC = () => {
	const [localMessage, setLocalMessage] =
		useState<IBaseErrorState<IThrowerResponse> | null>(null);
	const [carouselKey, setCarouselKey] = useState(0);
	const nav = useNavigate();
	function onSelect(key: number) {
		setCarouselKey(key);
	}

	const dispatch = useAppDispatch();
	const { latestPizzas, discountPizzas } = useAppSelector(
		state => state.pizzaReducer
	);
	const { GetLatestPizza, GetDiscountPizza } =
		DominoApi.Controllers.PizzaController;
	const { AddPizzaToCard } = ReduxBasicActions;

	async function onLoadLatestPizza() {
		await dispatch(GetLatestPizza());
	}
	async function onLoadDiscountPizza() {
		await dispatch(GetDiscountPizza());
	}

	useLayoutEffect(() => {
		onLoadLatestPizza();
		onLoadDiscountPizza();
	}, []);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		if (carouselKey < 1) {
	// 			setCarouselKey(carouselKey + 1);
	// 		} else {
	// 			setCarouselKey(0);
	// 		}
	// 	}, 15000);
	// 	return () => clearInterval(interval);
	// }, [carouselKey]);

	function AddToCardLatestPizzas(key: number) {
		if (latestPizzas) {
			dispatch(AddPizzaToCard(latestPizzas[key]));
			setLocalMessage({
				message: `Add ${latestPizzas[key].title} pizza to card, checkout please`,
				props: null,
			});
		}
	}
	function AddToCardDiscountPizzas(key: number) {
		if (discountPizzas) {
			dispatch(AddPizzaToCard(discountPizzas[key]));
			setLocalMessage({
				message: `Add ${discountPizzas[key].title} pizza to card, checkout please`,
				props: null,
			});
		}
	}

	return (
		<section className={`${style.mainview} init`}>
			<DefToast error={localMessage} type={'info'} seconds={3000} />
			<div className="w-screen">
				<div className={style.marqContainer}>
					<Marquee speed={40}>
						<div className={style.wrap}>
							<span className={style.item}>
								Taste any pizza in our fast food
							</span>
							<span className={style.item}>
								You can make pizza with any ingradients
							</span>
							<span className={style.item}>
								We cooked our pizza only fresh ingradients
							</span>
						</div>
					</Marquee>
				</div>
				<Carousel selectedFrame={carouselKey}>
					<FirstFrameCarousel
						onReadMore={() => {
							onSelect(1);
						}}
						onBuy={() => {
							nav('/allpizza');
						}}
						readmoretext="Read More"
					/>
					<SecondFrameCarousel
						onReadMore={() => {
							onSelect(2);
						}}
						onCreate={() => {
							nav('/createpizza');
						}}
						readmoretext="Read More"
					/>
					<ThirdFrameCarousel
						onReadMore={() => {
							onSelect(0);
						}}
						onCreate={() => {
							nav('/ingradients');
						}}
						readmoretext="Read More"
					/>
				</Carousel>
			</div>

			<div className="w-scren py-[2rem] flex flex-col items-center" id="latest">
				<h1 className="uppercase text-2xl font-bold font-rubik tracking-widest">
					new taste of pizza
				</h1>
				<p className="text-xl">
					Every time we experiment with tastes to create an ideal
				</p>
				<div className="flex mt-[2rem] gap-[5%] w-full justify-center relative">
					{latestPizzas?.map((item, index) => {
						return (
							<PizzaCard
								size={item.size}
								title={item.title}
								key={index}
								description={item.ingradients}
								price={item.price}
								discount={item.discount}
								src={item.image}
								available={item.available}
								onCard={() => {
									AddToCardLatestPizzas(index);
								}}
								stars={item.stars}
								onNav={() => {
									nav('/pizza/' + item.key);
									dispatch(pizzaSlice.actions.onSetSelectPizza(item));
								}}
							/>
						);
					})}
				</div>
			</div>

			<div className="relative w-full h-full overflow-hidden">
				<img
					src="https://i.redd.it/t9hnnhc4znc41.png"
					alt="bg"
					className="absolute top-0 left-0 w-full h-full object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-full flex justify-around backdrop-blur-xl bg-gradient-to-r from-grass/20 to-dark/60">
					<div className="h-full w-[1px] bg-slate-300/40"></div>
					<div className="h-full w-[1px] bg-slate-300/40"></div>
					<div className="h-full w-[1px] bg-slate-300/40"></div>
					<div className="h-full w-[1px] bg-slate-300/40"></div>
					<div className="h-full w-[1px] bg-slate-300/40"></div>
				</div>
				<div className="w-full h-full flex items-center px-[10%] py-[3rem] z-20">
					<div className="flex flex-col justify-center items-start gap-[1rem]">
						<h1 className="font-rubikmono text-3xl text-grass relative">
							<div className="absolute top-[-25%] left-[15%] bg-grass w-[70%] h-[150%] mix-blend-difference skew-x-12 rotate-[1deg]"></div>
							We cooking the best pizza for you
						</h1>
						<p className="text-lg text-jeans flex items-center gap-[1rem] bg-white/90 backdrop-blur-xl rounded-sm px-[1rem] w-auto shadow">
							<FontAwesomeIcon icon={faLocationDot} />
							Volodymyr Stelmakh St, 18 А, Rivne, Rivne Oblast, 33017
						</p>
					</div>
					<a
						href="https://www.google.com/maps/dir/50.6165577,26.259756/dominis+rivne/"
						target="_blank"
						className="ml-auto z-50"
					>
						<DefButton text="Google map view" />
					</a>
				</div>
			</div>

			<div
				className="w-scren py-[2rem] flex flex-col items-center"
				id="discount"
			>
				<h1 className="uppercase text-2xl font-bold font-rubik tracking-widest">
					Large discount on pizza
				</h1>
				<p className="text-xl">We make big discounts on our pizzas</p>
				<div className="flex mt-[2rem] gap-[5%] w-full justify-center relative">
					{discountPizzas?.map((item, index) => {
						return (
							<PizzaCard
								size={item.size}
								title={item.title}
								key={index}
								description={item.ingradients}
								price={item.price}
								discount={item.discount}
								src={item.image}
								available={item.available}
								onCard={() => {
									AddToCardDiscountPizzas(index);
								}}
								stars={item.stars}
								onNav={() => {
									nav('/pizza/' + item.key);
									dispatch(pizzaSlice.actions.onSetSelectPizza(item));
								}}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};
