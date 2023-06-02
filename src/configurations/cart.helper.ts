/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-empty */

export class CartHelper {
	public static variable: string = 'cart';

	public static getCartItems<T>(key: string): Array<T> | null {
		try {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as Array<T>) : null;
		} catch (error) {
			return null;
		}
	}

	static getCartItem<T>(key: string): T | null {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		} catch (error) {
			return null;
		}
	}

	static setCartItems<T>(key: string, value: Array<T>): void {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {}
	}

	static disposeCard(): void {
		localStorage.removeItem('cart');
	}
}
