import { Fragment, useEffect, useState } from 'react';
import {
	IBaseErrorState,
	IThrowerResponse,
} from '../../../redux/reducers/Commons/reducer.commontypes';
import { IDefToast } from './deftoast.types';

import style from './deftoats.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleInfo,
	faExclamation,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const DefToast: React.FC<IDefToast> = ({ type = 'info', ...props }) => {
	const [_error, setError] = useState<IBaseErrorState<IThrowerResponse> | null>(
		null
	);

	useEffect(() => {
		if (props.error) {
			setError(props.error);
		}

		const seconds: number = props.seconds ? props.seconds : 3000;

		const intervalId = setInterval(
			() => {
				setError(null);
			},
			props.seconds ? props.seconds : 3000
		);

		return () => clearInterval(intervalId);
	}, [props.error]);

	function GetTypeAsClass(): any {
		switch (type) {
			case 'info':
				return style.info;
			case 'warning':
				return style.warning;
			case 'error':
				return style.error;
			default:
				return style.info;
		}
	}

	function GetTypeAsIcon(): IconDefinition {
		switch (type) {
			case 'info':
				return faCircleInfo;
			case 'warning':
				return faTriangleExclamation;
			case 'error':
				return faExclamation;
			default:
				return faExclamation;
		}
	}

	return (
		<Fragment>
			{_error && (
				<div
					className={`${style.deftoats} ${GetTypeAsClass()}`}
					data-aos="fade-left"
				>
					<div className={style.container}>
						<div className="flex w-full pb-[.5rem]">
							<FontAwesomeIcon icon={GetTypeAsIcon()} className="text-xl" />
						</div>
						<Fragment>
							{!_error.props ? (
								<p className="font-quicksand">{props.error?.message}</p>
							) : (
								<div className={style.contentWrapper}>
									<h3 className={style.title}>
										Error: {props.error?.props?.StatusCode}
									</h3>
									<p>{props.error?.props?.Message}</p>
								</div>
							)}
						</Fragment>
					</div>
				</div>
			)}
		</Fragment>
	);
};
