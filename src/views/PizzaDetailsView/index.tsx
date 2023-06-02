/* eslint-disable no-empty */
import { useParams } from 'react-router-dom';
import style from './pizzadetailview.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { useLayoutEffect, useState } from 'react';
import { DominoApi } from '../../configurations/apis/DominoApi/domino.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeft,
	faHourglass1,
	faHryvniaSign,
	faPen,
	faStar,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useNav } from '../../hooks/useNav/useNav';
import { DefButton } from '../../components/Buttons/DefButton';
import { DefToast } from '../../components/Toasts/DefToast';
import {
	IBaseErrorState,
	IThrowerResponse,
} from '../../redux/reducers/Commons/reducer.commontypes';
import { ReduxBasicActions } from '../../redux/reducers/basicReducer/basic.actions';

export const PizzaDetailView: React.FC = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { selectedPizza, error } = useAppSelector(
		(state) => state.pizzaReducer
	);
	const { authorized } = useAppSelector((state) => state.authReducer);
	const { GetPizza, DeletePizza } = DominoApi.Controllers.PizzaController;
	const [localMessage, setLocalMessage] =
		useState<IBaseErrorState<IThrowerResponse> | null>(null);
	const { AddPizzaToCard } = ReduxBasicActions;
	const nav = useNav();

	const [isConfirmModal, setConfirmModal] = useState(false);

	async function fetchPizzaById() {
		if (id) {
			await dispatch(GetPizza(id));
		}
	}

	useLayoutEffect(() => {
		if (!selectedPizza) {
			fetchPizzaById();
		}
	}, []);

	useLayoutEffect(() => {
		if (error) {
			nav('/');
		}
	}, [error]);

	function GetSizes() {
		return ['Small', 'Large', 'Super Large', 'Extra'];
	}

	function GetSizeIndex(size: string | any) {
		if (size == 's') {
			return 0;
		} else if (size == 'l') {
			return 1;
		} else if (size == 'x') {
			return 2;
		} else if (size == 'xl') {
			return 3;
		}
	}

	function addToCard() {
		if (selectedPizza) {
			dispatch(AddPizzaToCard(selectedPizza));
			setLocalMessage({
				message: `Add ${selectedPizza.title} pizza to card, checkout please`,
				props: null,
			});
		}
	}

	async function onDeletePizza() {
		try {
			if (id) {
				setConfirmModal(false);
				await dispatch(DeletePizza(id));
				nav('/allpizza');
			}
		} catch (error) {}
	}

	return (
		<section className={`${style.pizzadetailview} init`}>
			{authorized && (
				<div className="fixed top-[7rem] right-[2rem] flex items-center gap-[1rem] z-[10]">
					<FontAwesomeIcon
						icon={faPen}
						className="text-white transition-all text-center rounded-sm bg-grapefruit p-[.5rem] cursor-pointer hover:bg-grapefruit-200"
						onClick={() => {
							nav('/admin/update_pizza/' + id);
						}}
					/>
					<FontAwesomeIcon
						icon={faTrash}
						className="text-white transition-all text-center rounded-sm bg-grapefruit p-[.5rem] cursor-pointer hover:bg-grapefruit-200"
						onClick={() => {
							setConfirmModal(!isConfirmModal);
						}}
					/>
				</div>
			)}
			{isConfirmModal && (
				<div
					className="fixed top-0 left-0 w-full h-full bg-dark/80 backdrop-blur z-[200] flex items-center justify-center"
					data-aos="zoom-out"
					onClick={() => {
						setConfirmModal(false);
					}}>
					<div className="flex flex-col gap-[4vh] items-center">
						<div className="text-grapefruit font-rubikmono text-xl flex flex-col items-center gap-[1rem]">
							Are you sure you want to delete{' '}
							<h2 className="-skew-x-12 text-grapefruit-200">
								{selectedPizza?.title}
							</h2>
							?
						</div>
						<button
							className="text-grapefruit font-semibold font-sans border-2 border-grapefruit rounded-md px-[1rem] py-[.5rem] transition-all hover:bg-grapefruit hover:text-white"
							onClick={onDeletePizza}>
							Yes, i'm sure
						</button>
					</div>
				</div>
			)}
			<DefToast error={localMessage} type={'info'} seconds={3000} />
			<div className="grid grid-cols-7">
				<img
					data-aos="fade-right"
					src={selectedPizza?.image}
					alt="bgpizza"
					className="mix-blend-multiply w-[20vw] col-span-3 justify-self-end"
				/>
				<div
					className="col-span-4 px-[10%] pr-[30%] flex flex-col gap-[1rem]"
					data-aos="fade-left">
					<div className="flex flex-col gap-[1rem]">
						<div className="flex items-center gap-[1rem]">
							<h1 className="font-rubik tracking-wider text-3xl uppercase">
								{selectedPizza?.title}
							</h1>

							{selectedPizza && (
								<p className="flex items-center gap-[.2rem]">
									{[...Array(6)].map((item, index) => {
										return (
											<FontAwesomeIcon
												key={index}
												icon={faStar}
												className={`text-base ${
													index < selectedPizza?.stars
														? 'text-sun-200'
														: 'text-dark'
												}`}
											/>
										);
									})}
								</p>
							)}
							<p
								className={`ml-auto uppercase font-semibold ${
									selectedPizza?.available
										? 'text-grass-200'
										: 'text-grapefruit-200'
								}`}>
								{selectedPizza?.available ? 'available' : 'not available'}
							</p>
						</div>
						<p
							className="text-jeans cursor-pointer"
							onClick={() => {
								nav('/ingradients');
							}}>
							{selectedPizza?.ingradients}
						</p>
						<div className="grid grid-cols-4 gap-[1rem]">
							{GetSizes().map((item, index) => {
								return (
									<div
										key={index}
										className={`rounded-xl py-[.5rem] px-[1rem] border-2 text-center ${
											index == GetSizeIndex(selectedPizza?.size)
												? 'border-grapefruit bg-grapefruit text-white'
												: 'text-slate-500 border-slate-400'
										}`}>
										{item}
									</div>
								);
							})}
						</div>
						<h2 className="text-grapefruit uppercase font-semibold font-rubikmono text-xl py-[2rem] flex items-center justify-center gap-[1rem]">
							<span className="flex items-center gap-[0.2rem]">
								{selectedPizza &&
									DominoApi.PriceWithDiscount(
										selectedPizza?.price,
										selectedPizza?.discount
									)}
								<FontAwesomeIcon icon={faHryvniaSign} />
							</span>
							<FontAwesomeIcon icon={faArrowLeft} className="text-dark" />
							<span className="flex items-center gap-[0.2rem] text-slate-400 line-through">
								{selectedPizza?.price}
								<FontAwesomeIcon icon={faHryvniaSign} />
							</span>
						</h2>
						{selectedPizza?.discount ? (
							<div className="bg-grapefruit rounded text-white text-center py-[1rem] mt-auto">
								Discount {selectedPizza?.discount}%
							</div>
						) : (
							<div className="bg-grass-200 rounded text-white text-center py-[1rem] mt-auto">
								This pizza has {selectedPizza?.stars} stars
							</div>
						)}
						<div className="w-full flex items-center">
							<div className="ml-auto flex items-center">
								{selectedPizza?.available && (
									<DefButton
										text="Add to cart"
										type="button"
										onClick={addToCard}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
