import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefButton } from '../../../Buttons/DefButton';
import style from './secondframecarousel.module.scss';
import { ISecondFrameCarousel } from './secondframecarousel.types';
import { useEffect } from 'react';
import React from 'react';

export const SecondFrameCarousel: React.FC<ISecondFrameCarousel> = ({
	...props
}) => {
	return (
		<div className={style.secondframecarousel}>
			<img
				src="https://i.etsystatic.com/22616986/r/il/5d7349/3601774020/il_fullxfull.3601774020_h65s.jpg"
				alt="png"
				className={style.bgimage}
				data-aos="zoom-out"
			/>
			<div className={style.cont}>
				<div className={style.fpart} data-aos="fade-right">
					<div className={style.square}></div>
					<h1 className={style.title}>You can make custom pizza</h1>
					<p className={style.desc}>
						You can make some pizza for you and us, with some ingradients and
						some taste
					</p>
					<div
						className={style.btnwrap}
						data-aos="fade-right"
						data-aos-transition="500"
					>
						<DefButton text="Create my pizza" onClick={props.onCreate} />
					</div>
				</div>
				<div className={style.spart} data-aos="fade-left">
					<div className={style.btnwrap}>
						<DefButton text={props.readmoretext} onClick={props.onReadMore} />
					</div>
					<img
						src="https://www.freepnglogos.com/uploads/pizza-png/pizza-slice-duvet-cover-sale-diane-diederich-22.png"
						alt="bg2"
						className={style.bg}
					/>
					<div className={style.wrapspart}>
						<div className={style.square2}></div>
						<h1 className={style.step}>Choose the size</h1>
						<FontAwesomeIcon icon={faArrowRight} className={style.arrow} />
						<h1 className={style.step}>Choose ingradients</h1>
						<FontAwesomeIcon icon={faArrowRight} className={style.arrow} />
						<h1 className={style.step}>Save and buy</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
