export interface IDefButton {
	text: any;
	type?: 'button' | 'submit';
	disable?: boolean;
	onClick?: () => void;
}
