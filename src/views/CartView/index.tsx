/* eslint-disable no-empty */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import style from './cartview.module.scss';
import { faCartPlus, faHryvniaSign } from '@fortawesome/free-solid-svg-icons';
import { DefButton } from '../../components/Buttons/DefButton';
import { useNav } from '../../hooks/useNav/useNav';
import GooglePayButton from '@google-pay/button-react';
import { CartCard } from '../../components/Cards/CartCard';
import { DominoApi } from '../../configurations/apis/DominoApi/domino.api';
import { basicSlice } from '../../redux/reducers/basicReducer/basic.slice';
import { DefToast } from '../../components/Toasts/DefToast';
import { useState } from 'react';
import {
	IBaseErrorState,
	IThrowerResponse,
} from '../../redux/reducers/Commons/reducer.commontypes';
import {
	ICreateCartOrderRequest,
	ICreateOrderRequest,
} from '../../redux/reducers/orderReducer/order.fetchmodels';

export const CartView: React.FC = () => {
	const { cart, isLoad } = useAppSelector(state => state.basicReducer);
	const [localMessage, setLocalMessage] =
		useState<IBaseErrorState<IThrowerResponse> | null>(null);
	const nav = useNav();
	const dispatch = useAppDispatch();
	const { CreateOrder, CreateCartOrder } =
		DominoApi.Controllers.OrderController;

	function getTitlePay() {
		if (cart) {
			return `${cart.map(item => item.title).join(', ')}`;
		}
		return "Domino's empty";
	}

	function getPricePay() {
		if (cart) {
			let price = 0;
			cart.forEach(element => {
				price += DominoApi.PriceWithDiscount(element.price, element.discount);
			});
			return `${price}`;
		}
		return '0';
	}

	async function loadPayment(payData: google.payments.api.PaymentData) {
		try {
			if (cart && payData) {
				let totalPrice = 0;
				cart.forEach(f => {
					totalPrice += DominoApi.PriceWithDiscount(f.price, f.discount);
				});
				const createOrderCartPayment: ICreateCartOrderRequest = {
					email: payData.email ? payData.email : 'annonimus',
					name: payData.shippingAddress?.name
						? payData.shippingAddress?.name
						: 'annonimus',
					address1: payData.shippingAddress?.address1
						? payData.shippingAddress?.address1
						: 'none address1',
					address2: payData.shippingAddress?.address2
						? payData.shippingAddress?.address2
						: 'none address2',
					area: payData.shippingAddress?.administrativeArea
						? payData.shippingAddress?.administrativeArea
						: 'none of area',
					cardDetail: payData.paymentMethodData.info?.cardDetails
						? payData.paymentMethodData.info?.cardDetails
						: 'none of carddetail',
					cardNetwork: payData.paymentMethodData.info?.cardNetwork
						? payData.paymentMethodData.info?.cardNetwork
						: 'none of cardnetwork',
					total: totalPrice,
					pizzasTitle: [...cart.map(item => item.title).reverse()],
				};
				await dispatch(CreateCartOrder(createOrderCartPayment));
				cart?.forEach(f => {
					dispatch(basicSlice.actions.onRemoveObject(f));
				});
				setLocalMessage({
					message: `The entire cart has been successfully paid and added to history`,
					props: null,
				});
			}
		} catch (error) {}
	}

	async function loadPaymentCard(
		payData: google.payments.api.PaymentData,
		key: number
	) {
		try {
			if (cart && payData) {
				const createOrderPayment: ICreateOrderRequest = {
					email: payData.email ? payData.email : 'annonimus',
					name: payData.shippingAddress?.name
						? payData.shippingAddress?.name
						: 'annonimus',
					address1: payData.shippingAddress?.address1
						? payData.shippingAddress?.address1
						: 'none address1',
					address2: payData.shippingAddress?.address2
						? payData.shippingAddress?.address2
						: 'none address2',
					area: payData.shippingAddress?.administrativeArea
						? payData.shippingAddress?.administrativeArea
						: 'none of area',
					cardDetail: payData.paymentMethodData.info?.cardDetails
						? payData.paymentMethodData.info?.cardDetails
						: 'none of carddetail',
					cardNetwork: payData.paymentMethodData.info?.cardNetwork
						? payData.paymentMethodData.info?.cardNetwork
						: 'none of cardnetwork',
					total: DominoApi.PriceWithDiscount(
						cart[key].price,
						cart[key].discount
					),
					pizzaTitle: cart[key].title,
				};
				await dispatch(CreateOrder(createOrderPayment));
				dispatch(basicSlice.actions.onRemoveObject(cart[key]));
				setLocalMessage({
					message: `Order ${cart[key].title} successfully paid and added to history`,
					props: null,
				});
			}
		} catch (error) {}
	}

	function onClearCart() {
		setLocalMessage({
			message: `Cart cleared`,
			props: null,
		});
		dispatch(basicSlice.actions.onDispose());
	}

	return cart && !isLoad ? (
		<section className={`${style.cartview} init`}>
			<DefToast error={localMessage} type={'info'} seconds={3000} />
			<div className="bg-light/80 backdrop-blur text-grapefruit/90 px-[10%] py-[2rem] flex justify-between items-center sticky top-0 left-0 w-full z-[100] border-b border-b-slate-300">
				<h1 className="text-2xl font-rubik uppercase text-dark">Cart</h1>
				<p className="font-rubik uppercase text-xl">{cart.length} orders</p>
				<p className="font-rubik uppercase text-xl">
					Total {getPricePay()} <FontAwesomeIcon icon={faHryvniaSign} />
				</p>
				<GooglePayButton
					environment="TEST"
					buttonLocale="en"
					buttonSizeMode="fill"
					paymentRequest={{
						apiVersion: 2,
						apiVersionMinor: 0,
						emailRequired: true,
						shippingAddressRequired: true,
						allowedPaymentMethods: [
							{
								type: 'CARD',
								parameters: {
									allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
									allowedCardNetworks: ['MASTERCARD', 'VISA'],
								},
								tokenizationSpecification: {
									type: 'PAYMENT_GATEWAY',
									parameters: {
										gateway: 'example',
										gatewayMerchantId: 'exampleGatewayMerchantId',
									},
								},
							},
						],
						merchantInfo: {
							merchantId: 'DOMINO_MERCHANT_TEST',
							merchantName: getTitlePay(),
						},
						transactionInfo: {
							totalPriceStatus: 'FINAL',
							totalPriceLabel: 'Total',
							totalPrice: getPricePay(),
							currencyCode: 'UAH',
							countryCode: 'UA',
						},
						callbackIntents: ['PAYMENT_AUTHORIZATION'],
					}}
					existingPaymentMethodRequired={false}
					buttonType="long"
					buttonColor="black"
					onLoadPaymentData={async payData => await loadPayment(payData)}
					onPaymentAuthorized={paymentData => {
						return { transactionState: 'SUCCESS' };
					}}
				/>
				<DefButton text="Clear cart" onClick={onClearCart} />
			</div>
			<div className="w-full py-[2rem] px-[10%] grid grid-cols-3 gap-[1rem]">
				{cart.map((item, index) => {
					return (
						<CartCard
							key={index}
							title={item.title}
							image={item.image}
							price={item.price}
							discount={item.discount}
							merchant={`Pizza ${item.title} with: ${item.ingradients}`}
							loadPayment={payData => loadPaymentCard(payData, index)}
						/>
					);
				})}
			</div>
		</section>
	) : (
		<section className={`${style.nocart} init`}>
			<DefToast error={localMessage} type={'info'} seconds={3000} />
			<div className="w-full bg-grapefruit/90 flex flex-col items-center gap-[1rem] justify-center py-[1rem] text-light">
				<FontAwesomeIcon
					icon={faCartPlus}
					className="text-4xl"
					data-aos="zoom-out"
				/>
				<h1
					className="uppercase text-2xl font-rubik tracking-wide"
					data-aos="zoom-out"
				>
					Cart has no products
				</h1>
			</div>
			<DefButton
				text="Go back"
				onClick={() => {
					nav(-1);
				}}
			/>
		</section>
	);
};
