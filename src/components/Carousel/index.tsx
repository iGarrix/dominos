import { Fragment, useEffect, useRef, useState } from 'react';
import style from './carousel.module.scss';
import { DefButton } from '../Buttons/DefButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SecondFrameCarousel } from './Frames/SecondFrameCarousel';

export interface ICarouselProps {
	children: Array<any>;
	selectedFrame: number;
}

export const Carousel: React.FC<ICarouselProps> = ({
	children,
	selectedFrame = 0,
	...props
}) => {
	return (
		<div className={style.carousel}>
			{children.map((item: any, key: number) => {
				return (
					<Fragment key={key}>{key === selectedFrame ? item : null}</Fragment>
				);
			})}
			<div className={style.counterwrap}>
				<h1 className={style.title}>
					{selectedFrame + 1}:{children.length}
				</h1>
			</div>
		</div>
	);
};
