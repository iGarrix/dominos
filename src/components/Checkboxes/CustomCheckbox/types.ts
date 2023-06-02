export interface ICustomCheckbox {
	value: boolean;
	text?: string;
	onCheck: (val: boolean) => void;
}
