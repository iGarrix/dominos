import { ApiAccountAction } from '../../../redux/reducers/authReducer/auth.action';
import { ApiOrderAction } from '../../../redux/reducers/orderReducer/order.actions';
import { ApiPizzaAction } from '../../../redux/reducers/pizzaReducer/pizza.actions';

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class DominoApi {
	// roles
	public static User: string = 'user';
	public static Admin: string = 'admin';

	// Size of pizza
	public static Small: string = 'm';
	public static Large: string = 'l';
	public static SuperLarge: string = 'x';
	public static ExtraLarge: string = 'xl';

	public static Controllers = {
		PizzaController: ApiPizzaAction,
		OrderController: ApiOrderAction,
		AuthController: ApiAccountAction,
	};

	public static PriceWithDiscount(price: number, discount: number): number {
		return Math.round(price - (price / 100) * discount);
	}

	public static GetControllerPath(
		controller: string,
		httpfunc: string
	): string {
		return 'api/' + controller + '/' + httpfunc;
	}
}

export enum TypePizza {
	Basic = 'basic',
	Custom = 'custom',
}

export enum PizzaFilterTypes {
	SortByOrdering = 'sort_price',
	SortByDescending = 'sort_descending_price',
}
