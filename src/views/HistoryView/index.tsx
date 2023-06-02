/* eslint-disable prefer-const */
import { Form, Formik } from 'formik';
import {
	IEmailFormik,
	ValidEmail,
} from '../../redux/reducers/orderReducer/order.types';
import style from './historyview.module.scss';
import FormikField from '../../components/Fields/FormikField';
import {
	faCalculator,
	faCreditCard,
	faEnvelope,
	faHryvniaSign,
	faLocation,
	faSearch,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { DefButton } from '../../components/Buttons/DefButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { DominoApi } from '../../configurations/apis/DominoApi/domino.api';
import { IFindOrderRequest } from '../../redux/reducers/orderReducer/order.fetchmodels';
import { DefToast } from '../../components/Toasts/DefToast';
import { HistoryCard } from '../../components/Cards/HistoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { orderSlice } from '../../redux/reducers/orderReducer/order.slice';
import { useEffect, useLayoutEffect, useTransition } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Paginator } from '../../components/Paginator';
import { useNav } from '../../hooks/useNav/useNav';
import { FetchLimits } from '../../configurations/global.conf';

export const HistoryView: React.FC = () => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const nav = useNav();

	const { findOrders, isLoad, error } = useAppSelector(
		state => state.orderReducer
	);
	const { FindOrders } = DominoApi.Controllers.OrderController;

	const emailFormik: IEmailFormik = {
		email: '',
	};

	const onSubmitForm = async (values: IEmailFormik) => {
		try {
			if (values) {
				const findRequest: IFindOrderRequest = {
					email: values.email,
					page: 1,
					take: FetchLimits.history_fetch_limit,
				};
				onSearch(findRequest);
			}
		} catch (error) {
			/* empty */
		}
	};

	const onSearch = (value: IFindOrderRequest) => {
		setSearchParams({
			email: value.email,
			page: value.page.toString(),
			take: value.take.toString(),
		});
	};

	function getParams(): IFindOrderRequest | null {
		const email = searchParams.get('email');
		const page = searchParams.get('page');
		const take = searchParams.get('take');
		if (email && page && take) {
			return {
				email: email,
				page: Number(page),
				take: Number(take),
			};
		}
		return null;
	}

	function GetTotally() {
		let total = 0;
		if (findOrders) {
			findOrders.pizzas.dataSet?.forEach(f => {
				total += DominoApi.PriceWithDiscount(f.price, f.discount);
			});
		}
		return total;
	}

	async function BeginLoad(param: IFindOrderRequest) {
		await dispatch(FindOrders(param));
	}

	useLayoutEffect(() => {
		dispatch(orderSlice.actions.onDispose());
	}, []);

	useEffect(() => {
		const param = getParams();
		if (param && searchParams) {
			onSearch(param);
			BeginLoad(param);
		}
	}, [searchParams]);

	const onPaginate = async (event: number) => {
		let param = getParams();
		if (param) {
			param.page = event;
			onSearch(param);
			await dispatch(FindOrders(param));
			window.document.documentElement.scrollTo(0, 0);
		}
	};

	return (
		<section className={`${style.historyview} init`}>
			{error && <DefToast error={error} seconds={3000} type={'error'} />}
			<div className="bg-light/80 backdrop-blur-xl text-grapefruit/90 px-[10%] py-[2rem] h-[5rem] flex items-center sticky gap-[10%] top-0 left-0 w-full z-[100] border-b border-b-slate-300">
				<h1 className="text-2xl font-rubik uppercase text-dark">
					history orders
				</h1>
				<Formik
					initialValues={emailFormik}
					onSubmit={onSubmitForm}
					validationSchema={ValidEmail}
				>
					<Form className={'flex items-center gap-[2vw]'} autoComplete="">
						<FormikField
							name="email"
							placeholder="Email"
							type="email"
							icon={faSearch}
						/>
						<DefButton type="submit" text="Search" />
					</Form>
				</Formik>
			</div>
			{findOrders ? (
				<div className="w-full h-full grid grid-cols-8 relative">
					<div
						className="w-full h-full col-span-2  border-b border-b-slate-300"
						data-aos="fade-right"
					>
						<div className="sticky top-[5rem] left-0 w-full flex flex-col flex-wrap justify-center py-[2vh] gap-[1rem] text-lg">
							<h1 className="flex items-center gap-[1rem] px-[10%]">
								<FontAwesomeIcon icon={faEnvelope} />{' '}
								{findOrders?.orderSimplyfied.email}
							</h1>
							<h1 className="flex items-center gap-[1rem] px-[10%]">
								<FontAwesomeIcon icon={faUser} />{' '}
								{findOrders?.orderSimplyfied.name}
							</h1>
							<h1 className="flex items-center gap-[1rem] px-[10%]">
								<FontAwesomeIcon icon={faLocation} />{' '}
								{findOrders?.orderSimplyfied.address1}{' '}
								{findOrders?.orderSimplyfied.address2}{' '}
								{findOrders?.orderSimplyfied.area}
							</h1>
							<h1 className="flex items-center gap-[1rem] px-[10%]">
								<FontAwesomeIcon icon={faCreditCard} />{' '}
								{findOrders?.orderSimplyfied.cardDetail}{' '}
								{findOrders?.orderSimplyfied.cardNetwork}
							</h1>
							<h1 className="flex items-center gap-[0.5rem] bg-grapefruit text-white py-[1rem] px-[10%] text-xl">
								Total: {GetTotally()} <FontAwesomeIcon icon={faHryvniaSign} />
							</h1>
						</div>
					</div>
					<div
						className="min-h-screen col-span-6 border-b border-l border-b-slate-300 border-l-slate-300 w-full flex flex-col items-start gap-[2rem] py-[2rem] px-[2rem]"
						data-aos="fade-left"
					>
						<div className="w-full h-auto grid grid-cols-4 gap-[2rem] items-start">
							{findOrders?.pizzas.dataSet?.map((item, index) => {
								return (
									<HistoryCard
										key={index}
										title={item.title}
										description={item.ingradients}
										price={item.price}
										discount={item.discount}
										src={item.image}
										size={item.size}
										stars={item.stars}
										onNav={() => {
											nav('/pizza/' + item.key);
										}}
									/>
								);
							})}
						</div>
						<div className="w-full flex justify-center gap-[2rem] mt-auto col-span-full">
							<Paginator
								total={findOrders.pizzas.totalPages}
								initialPage={getParams()?.page}
								onPaginate={onPaginate}
							/>
						</div>
					</div>
				</div>
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
