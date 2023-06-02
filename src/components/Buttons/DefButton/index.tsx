import style from './defbutton.module.scss';
import { IDefButton } from './defbutton.types';

export const DefButton: React.FC<IDefButton> = ({ ...props }) => {
	return (
		<button
			type={props.type}
			className={style.defbutton}
			onClick={props.onClick}
		>
			<div className={style.wrap}>{props.text}</div>
		</button>
	);
};
