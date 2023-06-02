/* eslint-disable @typescript-eslint/no-unused-vars */
import GooglePayButton from '@google-pay/button-react';
import { ICartCard } from './cartcard.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHryvniaSign } from '@fortawesome/free-solid-svg-icons';
import { DominoApi } from '../../../configurations/apis/DominoApi/domino.api';

export const CartCard: React.FC<ICartCard> = ({ ...props }) => {
	return (
		<div className="rounded-lg overflow-hidden bg-white relative flex transition-all hover:shadow-xl">
			{props.discount > 0 && (
				<div className="absolute top-0 right-0 bg-red-500 -skew-x-3 text-white px-[0.5rem]">
					{props.discount}%
				</div>
			)}
			<img
				src={props.image}
				alt="bg"
				className="w-[200px] mix-blend-multiply bg-dark object-contain bg-white"
			/>
			<div className="flex flex-col py-[1rem] w-full">
				<div className="flex flex-col px-[2rem]">
					<h1 className="uppercase font-bold font-sans">{props.title}</h1>
					<p className="whitespace-break-spaces text-dark/80">
						{props.merchant}
					</p>
					<p className="whitespace-break-spaces text-grapefruit uppercase text-lg flex items-center gap-[1rem] font-bold">
						<span>
							{DominoApi.PriceWithDiscount(props.price, props.discount)}{' '}
							<FontAwesomeIcon icon={faHryvniaSign} />
						</span>
						{props.discount > 0 && (
							<span className="text-slate-500/90 line-through">
								{props.price} <FontAwesomeIcon icon={faHryvniaSign} />
							</span>
						)}
					</p>
				</div>
				<div className="w-full flex justify-end mt-auto px-[1rem]">
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
								merchantName: props.merchant,
							},
							transactionInfo: {
								totalPriceStatus: 'FINAL',
								totalPriceLabel: 'Total',
								totalPrice: DominoApi.PriceWithDiscount(
									props.price,
									props.discount
								).toString(),
								currencyCode: 'UAH',
								countryCode: 'UA',
							},
							callbackIntents: ['PAYMENT_AUTHORIZATION'],
						}}
						existingPaymentMethodRequired={false}
						buttonType="order"
						buttonColor="black"
						onLoadPaymentData={async (payData) =>
							await props.loadPayment(payData)
						}
						onPaymentAuthorized={(paymentData) => {
							return { transactionState: 'SUCCESS' };
						}}
					/>
				</div>
			</div>
		</div>
	);
};
