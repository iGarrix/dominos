import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ingradientsview.module.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ingradients } from '../../configurations/global.conf';
import { IngradientCard } from '../../components/Cards/IngradientCard';

export const IngradientsView: React.FC = () => {
	return (
		<section className={`${style.ingradientsview} init`}>
			<img
				src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
				alt="bg"
				className={style.bg1}
			/>
			<div className={style.headblock} data-aos="zoom-in">
				<img
					src="https://weekendatthecottage.com/wp-content/uploads/2019/05/PizzaPartyIdeas6.jpg"
					alt="bg"
					className={style.bgblock}
				/>
				<div className={style.headblock_wrap}>
					<div className={style.headblock_wrap_sub}>
						<img
							src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
							alt="bg"
							className={style.bg_sub}
						/>
						<div className={style.content_headblock}>
							<div className={style.subcontent_headblock}>
								<h1 className={style.title_headblock}>
									We cook our pizza only with fresh products
								</h1>
								<p className={style.desc_headblock}>
									We add products from the farm to our pizzas, without
									impurities and GMOs
								</p>
								<div className={style.starlist}>
									{[...Array(5)].map((item, index) => {
										return (
											<FontAwesomeIcon
												key={index}
												icon={faStar}
												className={style.star}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={style.backrow} data-aos="fade-up">
				<h1 className={style.title}>all ingradients</h1>
			</div>
			<div className={style.contentWrap} data-aos="fade-up">
				{ingradients.map((item, index) => {
					return <IngradientCard key={index} index={index} ingradient={item} />;
				})}
			</div>
		</section>
	);
};
