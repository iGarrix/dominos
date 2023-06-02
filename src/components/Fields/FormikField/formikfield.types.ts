import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IFormikField {
	name: string;
	placeholder: string;
	disable?: boolean;
	icon?: IconDefinition;
	type?: 'text' | 'email' | 'password' | 'tel';
}
