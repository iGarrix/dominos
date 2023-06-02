import React from 'react';
import { IDefaultDropdown } from './types';

export const DefaultDropdown: React.FC<IDefaultDropdown> = ({ ...props }) => {
	return (
		<select
			value={props.value}
			className="outline-0 rounded-sm py-3 px-5 pr-20 w-full text-dark-200 bg-transparent border-2 border-slate-300 text-black font-semibold font-quicksand"
			onChange={props.onChange}
		>
			<option value="" disabled className="">
				{props.title}
			</option>
			{props.options.map(item => {
				return (
					<option
						key={item.key}
						value={item.key}
						className="font-semibold font-quicksand"
					>
						{item.value}
					</option>
				);
			})}
		</select>
	);
};
