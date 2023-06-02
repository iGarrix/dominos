/* eslint-disable no-empty */
import { useParams } from 'react-router-dom';
import style from './editpizzaview.module.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { useLayoutEffect, useState } from 'react';
import {
	DominoApi,
	TypePizza,
} from '../../../configurations/apis/DominoApi/domino.api';
import {
	IEditPizzaFormik,
	ValidEditPizza,
} from '../../../redux/reducers/pizzaReducer/pizza.types';
import { useNav } from '../../../hooks/useNav/useNav';
import { Form, Formik } from 'formik';
import FormikField from '../../../components/Fields/FormikField';
import {
	faHeading,
	faHryvniaSign,
	faImage,
	faPercent,
	faSpinner,
	faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefButton } from '../../../components/Buttons/DefButton';
import { DefToast } from '../../../components/Toasts/DefToast';
import { DefaultDropdown } from '../../../components/Dropdowns/DefaultDropdown';
import { ingradients } from '../../../configurations/global.conf';
import { IngradientCard } from '../../../components/Cards/IngradientCard';
import { IEditPizzaRequest } from '../../../redux/reducers/pizzaReducer/pizza.fetchs';

export interface ISecondaryState {
	typeofpizza: string;
	availability: string;
	size: string;
	stars: number;
	selectedIngradients: Array<string>;
}

export const EditPizzaView: React.FC = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { selectedPizza, error, isLoad } = useAppSelector(
		state => state.pizzaReducer
	);
	const { GetPizza, EditPizza } = DominoApi.Controllers.PizzaController;
	const nav = useNav();
	async function fetchPizzaById() {
		if (id) {
			await dispatch(GetPizza(id));
		}
	}

	useLayoutEffect(() => {
		if (!selectedPizza) {
			fetchPizzaById();
		} else {
			setState(prop => {
				prop.img = selectedPizza.image;
				prop.title = selectedPizza.title;
				prop.price = selectedPizza.price.toString();
				prop.discount = selectedPizza.discount.toString();
				return { ...prop };
			});
			setSecondaryState(prop => {
				prop.availability = selectedPizza.available
					? 'available'
					: 'noavailable';
				prop.typeofpizza = 'basic';
				prop.stars = selectedPizza.stars;
				prop.size = selectedPizza.size;
				prop.selectedIngradients = selectedPizza.ingradients.split(', ');
				return {
					...prop,
				};
			});
		}
	}, [selectedPizza]);

	const [state, setState] = useState<IEditPizzaFormik>({
		img: '',
		title: '',
		price: '',
		discount: '',
	});
	const [secondaryState, setSecondaryState] = useState<ISecondaryState>({
		typeofpizza: '',
		availability: '',
		size: '',
		stars: 0,
		selectedIngradients: [],
	});

	// const state: IEditPizzaFormik = ;

	const onSubmitForm = async (values: IEditPizzaFormik) => {
		try {
			if (
				values &&
				id &&
				secondaryState.typeofpizza &&
				secondaryState.typeofpizza.length > 0 &&
				secondaryState.availability &&
				secondaryState.availability.length > 0 &&
				secondaryState.size &&
				secondaryState.size.length > 0 &&
				secondaryState.selectedIngradients.length > 0
			) {
				const request: IEditPizzaRequest = {
					pizzaFindKey: id,
					dataObject: {
						title: values.title,
						ingradients: secondaryState.selectedIngradients.join(', '),
						size: secondaryState.size,
						stars: secondaryState.stars,
						discount: Number(values.discount),
						price: Number(values.price),
						typeofpizza: secondaryState.typeofpizza,
						image: values.img,
						available:
							secondaryState.availability === 'available' ? true : false,
					},
				};
				await dispatch(EditPizza(request));
				nav('/pizza/' + id);
			}
		} catch (error) {}
	};

	function getFullSize(size: string) {
		switch (size) {
			case 's':
				return 'Small';
			case 'l':
				return 'Large';
			case 'x':
				return 'Super large';
			case 'xl':
				return 'Extra';

			default:
				return 'Small';
		}
	}

	return (
		<section className={style.editpizzaview}>
			{error && <DefToast error={error} seconds={3000} type={'error'} />}
			<div className="bg-light flex flex-col items-center px-[2vh] py-[10vh] gap-[1rem] w-full">
				<img
					src={state.img}
					alt="imgpizza"
					className="w-[188px] object-contain mix-blend-multiply"
				/>
				<div className="text-center flex flex-col items-center gap-[.5rem]">
					<h1 className="text-2xl uppercase font-rubik">
						{selectedPizza ? selectedPizza.title : 'Update pizza'}
					</h1>
					{id}
				</div>
				<Formik
					initialValues={state}
					onSubmit={onSubmitForm}
					validationSchema={ValidEditPizza}
				>
					<Form className="flex flex-col gap-[1vh]" autoComplete="">
						<FormikField
							name="img"
							placeholder="Image src"
							type="text"
							icon={faImage}
						/>
						<FormikField
							name="title"
							placeholder="Title of pizza"
							type="text"
							icon={faHeading}
						/>
						<div className="flex items-center gap-[1vh]">
							<FormikField
								name="price"
								placeholder="Price of pizza"
								type="text"
								icon={faHryvniaSign}
							/>
							<FormikField
								name="discount"
								placeholder="Discount of pizza"
								type="text"
								icon={faPercent}
							/>
						</div>
						<div className="flex gap-[1vh]">
							<DefaultDropdown
								title={'Type of pizza'}
								value={secondaryState.typeofpizza}
								onChange={(e: any) => {
									setSecondaryState(props => {
										return { ...props, typeofpizza: e.target.value };
									});
								}}
								options={[
									{
										key: TypePizza.Basic,
										value: 'Basic',
									},
									{
										key: TypePizza.Custom,
										value: 'Custom (from users)',
									},
								]}
							/>
							<DefaultDropdown
								title={'Availability'}
								value={secondaryState.availability}
								onChange={(e: any) => {
									setSecondaryState(props => {
										return { ...props, availability: e.target.value };
									});
								}}
								options={[
									{
										key: 'noavailable',
										value: 'No available',
									},
									{
										key: 'available',
										value: 'Available',
									},
								]}
							/>
						</div>
						<div className="grid grid-cols-4 gap-[1vh]">
							{['s', 'l', 'x', 'xl'].map((item, key) => {
								return (
									<div
										key={key}
										className={`rounded-md border-2 py-[.5rem] text-center cursor-pointer ${
											item === secondaryState.size
												? 'border-grapefruit text-white bg-grapefruit'
												: 'border-slate-400 text-slate-400'
										}`}
										onClick={() => {
											setSecondaryState(prop => {
												return { ...prop, size: item };
											});
										}}
									>
										{getFullSize(item)}
									</div>
								);
							})}
						</div>
						<div className="grid grid-cols-6 gap-[1vh] py-[1vh]">
							{[...Array(6)].map((item, key) => {
								return (
									<div
										key={key}
										className={`flex justify-center items-center`}
										onClick={() => {
											setSecondaryState(props => {
												return { ...props, stars: key + 1 };
											});
										}}
									>
										<FontAwesomeIcon
											icon={faStar}
											className={`text-xl cursor-pointer ${
												key + 1 <= secondaryState.stars ? 'text-sun-200' : ''
											}`}
										/>
									</div>
								);
							})}
						</div>
						<div className="grid grid-cols-1 gap-[2vh]">
							<div className="border-2 border-slate-300 rounded-sm flex items-center px-[3%] py-[0.8rem] gap-[.5rem] flex-wrap">
								{secondaryState.selectedIngradients.length === 0 && (
									<span className="text-gray-400">No select</span>
								)}
								{secondaryState.selectedIngradients.map((item, key) => {
									return (
										<div
											key={key}
											className="bg-gray-300 rounded-xl px-[1rem] py-[.2rem] text-dark cursor-pointer whitespace-nowrap"
											onClick={() => {
												if (secondaryState.selectedIngradients.length > 1) {
													setSecondaryState(props => {
														props.selectedIngradients =
															props.selectedIngradients.filter(f => f !== item);
														return { ...props };
													});
												}
											}}
										>
											{item}
										</div>
									);
								})}
							</div>
							<div className="w-full grid grid-cols-4 gap-[1rem]">
								{ingradients.map((item, key) => {
									return (
										<button
											type="button"
											key={key}
											className="border-2 border-slate-300 rounded-sm text-center text-slate-400 py-[0.5rem] cursor-pointer"
											onClick={() => {
												setSecondaryState(props => {
													props.selectedIngradients.push(item.title);
													return { ...props };
												});
											}}
										>
											{item.title}
										</button>
									);
								})}
							</div>
						</div>
						<div className="flex w-full justify-end relative mt-[1rem] items-center">
							{isLoad && (
								<div className="absolute top-0 left-0 w-full h-full z-[100]"></div>
							)}
							<DefButton
								text={
									isLoad ? (
										<span className="flex items-center gap-[1rem]">
											<FontAwesomeIcon
												icon={faSpinner}
												className="animate-spin text-xl"
											/>{' '}
											loading
										</span>
									) : (
										'Save'
									)
								}
								type="submit"
							/>
						</div>
					</Form>
				</Formik>
			</div>
		</section>
	);
};
