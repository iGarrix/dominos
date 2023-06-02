import React, { useState } from 'react';
import { ICustomCheckbox } from './types';

import './style.scss';

export const CustomCheckbox: React.FC<ICustomCheckbox> = ({
	value,
	text,
	onCheck,
}) => {
	const [localcheck, setLocalCheck] = useState(value);

	function onHandleClick() {
		onCheck(!localcheck);
		setLocalCheck(!localcheck);
	}

	return (
		<div className="flex gap-1 justify-center items-center">
			<input
				type="checkbox"
				className="checked:bg-primary-100 w-5 h-5 border-0 outline-hidden"
				defaultChecked={localcheck}
				onClick={onHandleClick}
			/>
			<h1>{text}</h1>
		</div>
	);
};
