import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefButton } from '../../../Buttons/DefButton';
import style from './firstframecarousel.module.scss';
import { useEffect } from 'react';
import React from 'react';
import { IFirstFrameCarousel } from './firstframecarousel.types';

export const FirstFrameCarousel: React.FC<IFirstFrameCarousel> = ({
	...props
}) => {
	return (
		<div className={style.firstframecarousel}>
			<img
				src="https://images7.alphacoders.com/596/thumb-1920-596343.jpg"
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
						Buy pizza for your taste by least price
					</h1>
					<p className={style.desc}>Buy pizza for your taste by least price</p>
					<div
						className={style.btnwrap}
						data-aos="fade-right"
						data-aos-transition="500"
					>
						<DefButton text="Buy pizza for your taste" onClick={props.onBuy} />
					</div>
				</div>
				<div className={style.spart} data-aos="fade-left">
					<div className={style.btnwrap}>
						<DefButton text={props.readmoretext} onClick={props.onReadMore} />
					</div>
					<img
						src="https://pngimg.com/d/pizza_PNG7151.png"
						alt="bg2"
						className={style.bg}
					/>
					<img
						src="https://www.pngall.com/wp-content/uploads/4/Sauce-Bottle-PNG-Free-Download.png"
						alt="bg1"
						className={style.bg2}
					/>
				</div>
			</div>
		</div>
	);
};
