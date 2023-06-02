/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultDropdown } from '../../components/Dropdowns/DefaultDropdown';
import style from './allpizzaview.module.scss';
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import {
	FetchLimits,
	cheese_ingradients,
	chicken_ingradients,
	fruit_ingradients,
	ingradients,
	meat_ingradients,
	pepper_ingradients,
	sause_ingradients,
	vegetable_ingradients,
} from '../../configurations/global.conf';
import { CustomCheckbox } from '../../components/Checkboxes/CustomCheckbox';
import { useSearchParams } from 'react-router-dom';
import {
	IFindFilterFormik,
	ValidFindFilter,
} from '../../redux/reducers/pizzaReducer/pizza.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { useNav } from '../../hooks/useNav/useNav';
import { Form, Formik } from 'formik';
import FormikField from '../../components/Fields/FormikField';
import {
	DominoApi,
	PizzaFilterTypes,
} from '../../configurations/apis/DominoApi/domino.api';
import { IFilterPizzaRequest } from '../../redux/reducers/pizzaReducer/pizza.fetchs';
import { PizzaCard } from '../../components/Cards/PizzaCard';
import { pizzaSlice } from '../../redux/reducers/pizzaReducer/pizza.slice';
import { Paginator } from '../../components/Paginator';
import { ReduxBasicActions } from '../../redux/reducers/basicReducer/basic.actions';
import {
	IBaseErrorState,
	IThrowerResponse,
} from '../../redux/reducers/Commons/reducer.commontypes';
import { DefToast } from '../../components/Toasts/DefToast';
import { IPizza } from '../../redux/reducers/basicReducer/basic.types';

export interface IFilterProps {
	sizeofpizza: string;
	cheese: Array<string>;
	pepper: Array<string>;
	chicken: Array<string>;
	meat: Array<string>;
	vegetable: Array<string>;
	fruit: Array<string>;
	sause: Array<string>;
}

export interface ISearchProps {
	find: string;
	sorting: string;
	sizeofpizza: string;
	ingradients: string;
	page: number;
	take: number;
}

export const AllPizzaView: React.FC = () => {
	const [localMessage, setLocalMessage] =
		useState<IBaseErrorState<IThrowerResponse> | null>(null);
	const [isFilterOpen, setFilterOpen] = useState(false);
	const [filter, setFilter] = useState<IFilterProps>({
		sizeofpizza: 'none',
		meat: [],
		vegetable: [],
		sause: [],
		cheese: [],
		fruit: [],
		pepper: [],
		chicken: [],
	});
	const dispatch = useAppDispatch();
	const nav = useNav();

	const { GetFilterPizza } = DominoApi.Controllers.PizzaController;
	const { allPizza, error } = useAppSelector(state => state.pizzaReducer);
	const { AddPizzaToCard } = ReduxBasicActions;

	const findFormik: IFindFilterFormik = {
		find: '',
	};

	const [searchParams, setSearchParams] = useSearchParams();

	async function fetchFilter(request: IFilterPizzaRequest) {
		await dispatch(GetFilterPizza(request));
	}

	const onSearch = (value: ISearchProps) => {
		setSearchParams({
			find: value.find,
			sorting: value.sorting,
			sizeofpizza: value.sizeofpizza,
			ingradients: value.ingradients,
			page: value.page.toString(),
			take: value.take.toString(),
		});

		fetchFilter({
			search: value.find,
			sorting: value.sorting,
			sizeofpizza: value.sizeofpizza,
			ingradients: value.ingradients,
			page: value.page,
			take: value.take,
		});
	};

	function getParams(): ISearchProps {
		const find = searchParams.get('find');
		const sorting = searchParams.get('sorting');
		const page = searchParams.get('page');
		const take = searchParams.get('take');
		const sizeofpizza = searchParams.get('sizeofpizza');
		const ingradients = searchParams.get('ingradients');
		let returnParams: ISearchProps = {
			find: 'none',
			sorting: 'none',
			sizeofpizza: 'none',
			ingradients: 'none',
			page: 1,
			take: FetchLimits.pizza_fetch_limit,
		};
		if (find) {
			returnParams.find = find;
		}
		if (sorting) {
			returnParams.sorting = sorting;
		}
		if (page) {
			returnParams.page = Number(page);
		}
		if (take) {
			returnParams.take = Number(take);
		}
		if (sizeofpizza) {
			returnParams.sizeofpizza = sizeofpizza;
		}
		if (ingradients) {
			returnParams.ingradients = ingradients;
		}
		return returnParams;
	}

	const onSubmitForm = async (values: IFindFilterFormik) => {
		try {
			if (values) {
				let param = getParams();
				if (param) {
					param.find = values.find;
					onSearch(param);
					return;
				}
				const ingradients = [
					...filter.meat,
					...filter.vegetable,
					...filter.sause,
					...filter.cheese,
					...filter.fruit,
					...filter.pepper,
					...filter.chicken,
				].join(',');
				let findRequest: ISearchProps = {
					find: values.find,
					sorting: 'none',
					sizeofpizza: 'none',
					ingradients: ingradients.length > 0 ? ingradients : 'none',
					page: 1,
					take: FetchLimits.pizza_fetch_limit,
				};
				onSearch(findRequest);
			}
		} catch (error) {
			/* empty */
		}
	};

	useLayoutEffect(() => {
		onSearch({
			find: getParams().find,
			sorting: getParams().sorting,
			sizeofpizza: getParams().sizeofpizza,
			ingradients: getParams().ingradients,
			page: getParams().page,
			take: FetchLimits.pizza_fetch_limit,
		});
		setFilter(prop => {
			prop.sizeofpizza = getParams().sizeofpizza;
			return { ...prop };
		});
	}, []);

	useEffect(() => {
		const ingradients = [
			...filter.meat,
			...filter.vegetable,
			...filter.sause,
			...filter.cheese,
			...filter.fruit,
			...filter.pepper,
			...filter.chicken,
		].join(',');
		let param = getParams();
		if (param) {
			param.sizeofpizza = filter.sizeofpizza;
			param.ingradients = ingradients.length > 0 ? ingradients : 'none';
			param.page = 1;
			onSearch(param);
			return;
		} else {
			let findRequest: ISearchProps = {
				find: 'none',
				sorting: 'none',
				sizeofpizza: filter.sizeofpizza,
				ingradients: ingradients.length > 0 ? ingradients : 'none',
				page: 1,
				take: FetchLimits.pizza_fetch_limit,
			};
			onSearch(findRequest);
		}
	}, [filter]);

	async function onSorting(e: any) {
		let param = getParams();
		if (param) {
			param.sorting = e.target.value;
			onSearch(param);
			return;
		}
		const newParam: ISearchProps = {
			find: 'none',
			sorting: e.target.value,
			sizeofpizza: 'none',
			ingradients: 'none',
			page: 1,
			take: FetchLimits.pizza_fetch_limit,
		};
		onSearch(newParam);
	}

	function onSizeChange(e: any) {
		setFilter((filter: any) => {
			filter.sizeofpizza = e.target.value;
			return { ...filter };
		});
	}

	function onCheeseAdding(id: number, val: boolean) {
		if (val) {
			setFilter((filter: any) => {
				filter.cheese = [...filter.cheese, cheese_ingradients[id].title];
				return { ...filter };
			});
			return;
		}
		setFilter((filter: any) => {
			filter.cheese = filter.cheese.filter(
				(f: string) => f !== cheese_ingradients[id].title
			);
			return { ...filter };
		});
	}

	function onPepperAdding(id: number, val: boolean) {
		if (val) {
			setFilter((filter: any) => {
				filter.pepper = [...filter.pepper, pepper_ingradients[id].title];
				return { ...filter };
			});
			return;
		}
		setFilter((filter: any) => {
			filter.pepper = filter.pepper.filter(
				(f: string) => f !== pepper_ingradients[id].title
			);
			return { ...filter };
		});
	}

	function onChickenAdding(id: number, val: boolean) {
		if (val) {
			setFilter((filter: any) => {
				filter.chicken = [...filter.chicken, chicken_ingradients[id].title];
				return { ...filter };
			});
			return;
		}
		setFilter((filter: any) => {
			filter.chicken = filter.chicken.filter(
				(f: string) => f !== chicken_ingradients[id].title
			);
			return { ...filter };
		});
	}

	function onMeatAdding(id: number, val: boolean) {
		if (val) {
			setFilter((filter: any) => {
				filter.meat = [...filter.meat, meat_ingradients[id].title];
				return { ...filter };
			});
			return;
		}
		setFilter((filter: any) => {
			filter.meat = filter.meat.filter(
				(f: string) => f !== meat_ingradients[id].title
			);
			return { ...filter };
		});
	}

	function onVegeetableAdding(id: number, val: boolean) {
		if (val) {
			setFilter((filter: any) => {
				filter.vegetable = [
					...filter.vegetable,
					vegetable_ingradients[id].title,
				];
				return { ...filter };
			});
			return;
		}
		setFilter((filter: any) => {
			filter.vegetable = filter.vegetable.filter(
				(f: string) => f !== vegetable_ingradients[id].title
			);
			return { ...filter };
		});
	}

	function onFruitAdding(id: number, val: boolean) {
		if (val) {
			setFilter((filter: any) => {
				filter.fruit = [...filter.fruit, fruit_ingradients[id].title];
				return { ...filter };
			});
			return;
		}
		setFilter((filter: any) => {
			filter.fruit = filter.fruit.filter(
				(f: string) => f !== fruit_ingradients[id].title
			);
			return { ...filter };
		});
	}

	function onSauseAdding(id: number, val: boolean) {
		if (val) {
			setFilter((filter: any) => {
				filter.sause = [...filter.sause, sause_ingradients[id].title];
				return { ...filter };
			});
			return;
		}
		setFilter((filter: any) => {
			filter.sause = filter.sause.filter(
				(f: string) => f !== sause_ingradients[id].title
			);
			return { ...filter };
		});
	}

	const onPaginate = async (event: number) => {
		let param = getParams();
		if (param) {
			param.page = event;
			onSearch(param);
			window.document.documentElement.scrollTo(0, 0);
		}
	};

	function AddToCard(pizza: IPizza) {
		if (pizza) {
			dispatch(AddPizzaToCard(pizza));
			setLocalMessage({
				message: `Add ${pizza.title} pizza to card, checkout please`,
				props: null,
			});
		}
	}

	return (
		<section className={style.allpizzaview}>
			<DefToast error={localMessage} type={'info'} seconds={3000} />
			<div
				className="bg-light/80 backdrop-blur-xl text-grapefruit/90 px-[10%] sticky gap-[10%] h-[6rem] top-0 left-0 w-full z-[100] border-b border-b-slate-300 grid grid-cols-3 justify-center items-center"
				//data-aos="fade-down"
			>
				<div>
					<DefaultDropdown
						title={'Sorting'}
						value={getParams().sorting}
						onChange={onSorting}
						options={[
							{ key: 'none', value: 'Order by all' },
							{ key: PizzaFilterTypes.SortByOrdering, value: 'Order by price' },
							{
								key: PizzaFilterTypes.SortByDescending,
								value: 'Order descending by price',
							},
						]}
					/>
				</div>
				<div>
					<Formik
						initialValues={findFormik}
						onSubmit={onSubmitForm}
						validationSchema={ValidFindFilter}
					>
						<Form className={'flex items-center gap-[2vw]'} autoComplete="">
							<FormikField
								name="find"
								placeholder="Search any"
								type="text"
								icon={faSearch}
							/>
						</Form>
					</Formik>
				</div>
				<div>
					<div className="flex flex-col items-end w-full">
						<button
							className="rounded-lg border-2 border-dark text-dark py-[.5rem] px-[2rem] transition-all hover:shadow-xl hover:scale-105"
							onClick={() => {
								setFilterOpen(!isFilterOpen);
							}}
						>
							<FontAwesomeIcon icon={faFilter} /> Filter
						</button>
						{isFilterOpen && (
							<div className="relative w-full">
								<div className="w-auto border border-slate-300 bg-light shadow-xl rounded-sm absolute top-[2rem] right-0 py-[1.5rem] px-[3rem] flex gap-[3rem] overflow-hidden">
									<form
										className="flex flex-col text-dark text-lg"
										onChange={onSizeChange}
									>
										<h1 className="uppercase text-lg font-rubik whitespace-nowrap">
											Size of pizza
										</h1>
										<span className="flex items-center gap-[.5rem] whitespace-nowrap ">
											<input
												defaultChecked={filter.sizeofpizza === 'none'}
												type="radio"
												name="size"
												value="none"
												id="all"
												className="bg-red-500"
											/>
											<label htmlFor="all">All sizes</label>
										</span>
										<span className="flex items-center gap-[.5rem] whitespace-nowrap ">
											<input
												defaultChecked={filter.sizeofpizza === 's'}
												type="radio"
												name="size"
												value="s"
												id="small"
												className="bg-red-500"
											/>
											<label htmlFor="small">Small</label>
										</span>
										<span className="flex items-center gap-[.5rem] whitespace-nowrap">
											<input
												defaultChecked={filter.sizeofpizza === 'l'}
												type="radio"
												name="size"
												value="l"
												className=""
												id="large"
											/>
											<label htmlFor="large">Large</label>
										</span>
										<span className="flex items-center gap-[.5rem] whitespace-nowrap">
											<input
												defaultChecked={filter.sizeofpizza === 'x'}
												type="radio"
												name="size"
												value="x"
												className=""
												id="super_large"
											/>
											<label htmlFor="super_large">Super large</label>
										</span>
										<span className="flex items-center gap-[.5rem] whitespace-nowrap">
											<input
												defaultChecked={filter.sizeofpizza === 'xl'}
												type="radio"
												name="size"
												value="xl"
												className=""
												id="extra"
											/>
											<label htmlFor="extra">Extra</label>
										</span>
									</form>
									<div className="flex text-dark gap-[2rem]">
										<div className="flex flex-col">
											<div className="flex flex-col text-dark text-lg">
												<h1 className="font-semibold uppercase text-lg font-rubik">
													meat
												</h1>

												{ingradients
													.filter(f => f.type === 'Meat')
													.map((item, index) => {
														return (
															<span
																key={index}
																className="flex items-center gap-[.5rem] whitespace-nowrap"
															>
																<CustomCheckbox
																	value={
																		filter.meat.filter(f => f === item.title)
																			.length === 1 ||
																		getParams()
																			.ingradients.split(',')
																			.filter(f => f === item.title).length ===
																			1
																	}
																	onCheck={(val: boolean) => {
																		onMeatAdding(index, val);
																	}}
																/>
																{item.title}
															</span>
														);
													})}
											</div>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col text-dark text-lg">
												<h1 className="font-semibold uppercase text-lg font-rubik">
													vegetable
												</h1>

												{ingradients
													.filter(f => f.type === 'Vegetable')
													.map((item, index) => {
														return (
															<span
																key={index}
																className="flex items-center gap-[.5rem] whitespace-nowrap"
															>
																<CustomCheckbox
																	value={
																		filter.vegetable.filter(
																			f => f === item.title
																		).length === 1
																	}
																	onCheck={(val: boolean) => {
																		onVegeetableAdding(index, val);
																	}}
																/>
																{item.title}
															</span>
														);
													})}
											</div>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col text-dark text-lg">
												<h1 className="font-semibold uppercase text-lg font-rubik">
													sause
												</h1>

												{ingradients
													.filter(f => f.type === 'Sause')
													.map((item, index) => {
														return (
															<span
																key={index}
																className="flex items-center gap-[.5rem] whitespace-nowrap"
															>
																<CustomCheckbox
																	value={
																		filter.sause.filter(f => f === item.title)
																			.length === 1
																	}
																	onCheck={(val: boolean) => {
																		onSauseAdding(index, val);
																	}}
																/>
																{item.title}
															</span>
														);
													})}
											</div>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col text-dark text-lg">
												<h1 className="font-semibold uppercase text-lg font-rubik whitespace-nowrap">
													Cheese
												</h1>

												{ingradients
													.filter(f => f.type === 'Cheese')
													.map((item, index) => {
														return (
															<span
																key={index}
																className="flex items-center gap-[.5rem] whitespace-nowrap"
															>
																<CustomCheckbox
																	value={
																		filter.cheese.filter(f => f === item.title)
																			.length === 1
																	}
																	onCheck={(val: boolean) => {
																		onCheeseAdding(index, val);
																	}}
																/>
																{item.title}
															</span>
														);
													})}
											</div>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col text-dark text-lg">
												<h1 className="font-semibold uppercase text-lg font-rubik">
													fruit
												</h1>

												{ingradients
													.filter(f => f.type === 'Fruit')
													.map((item, index) => {
														return (
															<span
																key={index}
																className="flex items-center gap-[.5rem] whitespace-nowrap"
															>
																<CustomCheckbox
																	value={
																		filter.fruit.filter(f => f === item.title)
																			.length === 1
																	}
																	onCheck={(val: boolean) => {
																		onFruitAdding(index, val);
																	}}
																/>
																{item.title}
															</span>
														);
													})}
											</div>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col text-dark text-lg">
												<h1 className="font-semibold uppercase text-lg font-rubik">
													pepper
												</h1>

												{ingradients
													.filter(f => f.type === 'Pepper')
													.map((item, index) => {
														return (
															<span
																key={index}
																className="flex items-center gap-[.5rem] whitespace-nowrap"
															>
																<CustomCheckbox
																	value={
																		filter.pepper.filter(f => f === item.title)
																			.length === 1
																	}
																	onCheck={(val: boolean) => {
																		onPepperAdding(index, val);
																	}}
																/>
																{item.title}
															</span>
														);
													})}
											</div>
										</div>
										<div className="flex flex-col">
											<div className="flex flex-col text-dark text-lg">
												<h1 className="font-semibold uppercase text-lg font-rubik">
													chicken
												</h1>

												{ingradients
													.filter(f => f.type === 'Chicken')
													.map((item, index) => {
														return (
															<span
																key={index}
																className="flex items-center gap-[.5rem] whitespace-nowrap"
															>
																<CustomCheckbox
																	value={
																		filter.chicken.filter(f => f === item.title)
																			.length === 1
																	}
																	onCheck={(val: boolean) => {
																		onChickenAdding(index, val);
																	}}
																/>
																{item.title}
															</span>
														);
													})}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{allPizza && allPizza.dataSet && !error ? (
				<Fragment>
					{' '}
					<div className="grid grid-cols-5 gap-[2rem] px-[5%] flex-wrap py-[2rem]">
						{allPizza?.dataSet?.map((item, index) => {
							return (
								<div key={index} className="flex justify-center">
									<PizzaCard
										size={item.size}
										title={item.title}
										description={item.ingradients}
										price={item.price}
										discount={item.discount}
										src={item.image}
										available={item.available}
										onCard={() => {
											AddToCard(item);
										}}
										stars={item.stars}
										onNav={() => {
											nav('/pizza/' + item.key);
											dispatch(pizzaSlice.actions.onSetSelectPizza(item));
										}}
									/>
								</div>
							);
						})}
					</div>
					<div className="w-full flex justify-center gap-[2rem] mt-auto px-[5%]">
						{allPizza && (
							<Paginator
								total={allPizza.totalPages}
								initialPage={getParams()?.page}
								onPaginate={onPaginate}
							/>
						)}
					</div>
				</Fragment>
			) : (
				<div className="w-full h-[calc(100vh-11vh)] flex flex-col gap-[1rem] justify-center items-center">
					<FontAwesomeIcon
						icon={faSearch}
						data-aos="zoom-out"
						className="text-4xl text-grapefruit"
					/>
					<h1
						className="font-rubik tracking-widest text-2xl uppercase text-grapefruit"
						data-aos="zoom-out"
					>
						Search orders
					</h1>
				</div>
			)}
		</section>
	);
};
