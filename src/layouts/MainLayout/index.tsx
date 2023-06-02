import { Outlet } from 'react-router-dom';
import style from './mainlayout.module.scss';
import { MainHeader } from '../../components/Headers/MainHeader';
import { useEffect, useState } from 'react';
import { MainFooter } from '../../components/Footers/MainFooter';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IPizza } from '../../redux/reducers/basicReducer/basic.types';
import { CartHelper } from '../../configurations/cart.helper';
import { basicSlice } from '../../redux/reducers/basicReducer/basic.slice';

export const MainLayout: React.FC = () => {
	const [pos, setPos] = useState(0);
	const dispatch = useAppDispatch();
	const { basicReducer, orderReducer, pizzaReducer } = useAppSelector(
		state => state
	);
	function scrollup() {
		setPos(window.pageYOffset || document.documentElement.scrollTop);
		if ((window.pageYOffset || document.documentElement.scrollTop) < pos) {
			window.document.getElementById('#header')?.classList.remove('hiddenal');
			window.document.getElementById('#header')?.classList.add('visibility');
		} else {
			window.document.getElementById('#header')?.classList.remove('visibility');
			window.document.getElementById('#header')?.classList.add('hiddenal');
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', scrollup);
		return () => {
			window.removeEventListener('scroll', scrollup);
		};
	}, [pos]);

	useEffect(() => {
		const storageCart: Array<IPizza> | null = CartHelper.getCartItems(
			CartHelper.variable
		);
		if (storageCart) {
			dispatch(basicSlice.actions.onSetCard(storageCart));
		}
	}, []);

	function getLoad() {
		if (basicReducer.isLoad || orderReducer.isLoad || pizzaReducer.isLoad) {
			return true;
		}
		return false;
	}

	return (
		<section className={`${style.mainlayout} init`}>
			{getLoad() && <div className={style.loader}></div>}
			{/* {getLoad() && (
				<div className="fixed top-0 left-0 z-[2000] bg-dark/80 backdrop-blur w-full h-full flex justify-center items-center">
					<FontAwesomeIcon
						icon={faSpinner}
						className="text-[2vw] text-white animate-spin"
					/>
				</div>
			)} */}
			<MainHeader />
			<Outlet />
			<MainFooter />
		</section>
	);
};
