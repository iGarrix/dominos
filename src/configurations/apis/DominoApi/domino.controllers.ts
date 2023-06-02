export enum AccountControllerMethods {
	Root = 'Account',
	Register = 'REGISTER_ACCOUNT',
	Login = 'LOGIN_BY_EMAIL',
	Authority = 'GET_AUTHORIZE',
	Refresh = 'REFRESH_TOKEN',
	Revoke = 'REVOKE_USER',
	RevokeAll = 'REVOKE_ALL_USERS',
}

export enum PizzaControllerMethods {
	Root = 'Pizza',
	Create = 'CREATE_PIZZA',
	GetAllPizza = 'GET_ALL_PIZZA',
	GetDiscount = 'GET_DISCOUNT_PIZZA',
	GetLatest = 'GET_LATEST_PIZZA',
	GetPizza = 'GET_PIZZA',
	DeletePizza = 'DELETE_PIZZA',
	EditPizza = 'EDIT_PIZZA',
}

export enum OrderControllerMethods {
	Root = 'Order',
	CreateOrder = 'CREATE_ORDER',
	CreateCartOrder = 'CREATE_CART_ORDER',
	GetOrders = 'GET_ORDERS',
}
