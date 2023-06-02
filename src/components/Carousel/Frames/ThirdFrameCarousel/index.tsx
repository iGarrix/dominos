import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefButton } from '../../../Buttons/DefButton';
import style from './thirdframecarousel.module.scss';
import { useEffect } from 'react';
import React from 'react';
import { IThirdFrameCarousel } from './thirdframecarousel.types';

export const ThirdFrameCarousel: React.FC<IThirdFrameCarousel> = ({
	...props
}) => {
	return (
		<div className={style.thirdframecarousel}>
			<img
				src="https://i.pinimg.com/564x/13/91/06/139106980e1d779508c70b3698d5dcd9.jpg"
				alt="png"
				className={style.bgimage}
				data-aos="zoom-out"
			/>
			<div className={style.cont}>
				<div className={style.fpart} data-aos="fade-right">
					<div className={style.squarewrap}>
						<div className={style.square}></div>
						<div className={style.square}></div>
					</div>
					<h1 className={style.title}>
						We cook our pizza only from fresh products
					</h1>
					<p className={style.desc}>
						All kinds of pizzas that you can make yourself and our choice, all
						only from fresh products
					</p>
					<div
						className={style.btnwrap}
						data-aos="fade-right"
						data-aos-transition="500"
					>
						<DefButton text="View all ingradients" onClick={props.onCreate} />
					</div>
				</div>
				<div className={style.spart} data-aos="fade-left">
					<div className={style.btnwrap}>
						<DefButton text={props.readmoretext} onClick={props.onReadMore} />
					</div>
					<div className="w-full h-full absolute top-0 left-0">
						<div className="w-full h-full relative">
							<img
								src="https://pngimg.com/d/pizza_PNG7151.png"
								alt="bg2"
								className={style.bg2}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
