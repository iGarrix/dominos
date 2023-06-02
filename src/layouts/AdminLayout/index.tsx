/* eslint-disable @typescript-eslint/no-empty-function */
import { Outlet } from 'react-router-dom';
import style from './adminlayout.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouse,
	faLocation,
	faPersonWalkingArrowLoopLeft,
} from '@fortawesome/free-solid-svg-icons';
import { DominoApi } from '../../configurations/apis/DominoApi/domino.api';
import { useNav } from '../../hooks/useNav/useNav';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';

export const AdminLayout: React.FC = () => {
	const { authorized } = useAppSelector(state => state.authReducer);
	const { RevokeAuthorizate } = DominoApi.Controllers.AuthController;
	const dispatch = useAppDispatch();
	const location = useLocation();
	const nav = useNav();
	async function onLogout() {
		await dispatch(RevokeAuthorizate());
	}

	return (
		<section className={style.adminlayout}>
			<header
				className="fixed top-0 left-0 bg-light/20 h-screen w-[15vw] border-r border-r-slate-300 backdrop-blur z-[5000] flex flex-col items-center pt-[4vh] overflow-hidden"
				data-aos="fade-right"
			>
				<div className="w-full h-full flex flex-col items-center gap-[2vh]">
					<h1 className="uppercase font-rubik text-2xl">Admin panel</h1>
					<span className="flex flex-col items-center">
						<h1>Authorized by:</h1>
						<h1>{authorized?.email}</h1>
					</span>
					<div className="w-full h-full flex flex-col mt-[2vh]">
						<h1 className="px-[10%]  gap-[.5rem] flex items-center uppercase bg-grapefruit text-white py-[.5rem]">
							<FontAwesomeIcon icon={faLocation} className="text-xl" />
							{location.pathname.replace('/admin', '')
								? location.pathname.replace('/admin/', '')
								: 'No select'}
						</h1>
						<ol className="w-full mt-[1vh] h-full divide-y divide-slate-300 flex flex-col">
							<li
								className={`py-[.8rem] px-[10%] transition-all text-dark/90 cursor-pointer ${
									location.pathname === '/admin/pizza'
										? 'bg-jeans/80 text-white font-semibold'
										: 'hover:bg-jeans hover:text-white text-dark/90'
								}`}
								onClick={() => {
									nav('/allpizza');
								}}
							>
								Pizzas
							</li>
							<li
								className={`py-[.8rem] px-[10%] transition-all cursor-pointer ${
									location.pathname === '/admin/ingradients'
										? 'bg-jeans/80 text-white font-semibold'
										: 'hover:bg-jeans hover:text-white text-dark/90'
								}`}
								onClick={() => {
									nav('./ingradients');
								}}
							>
								Ingradients
							</li>
							<li
								className="py-[.8rem] px-[10%] transition-all text-dark/90 cursor-pointer hover:bg-jeans hover:text-white mt-auto flex items-center gap-[1rem]"
								onClick={() => {
									nav('/');
								}}
							>
								<FontAwesomeIcon icon={faHouse} />
								<span>Go back</span>
							</li>
							<li
								className="py-[.8rem] px-[10%] transition-all text-dark/90 cursor-pointer hover:bg-grapefruit hover:text-white flex items-center gap-[1rem]"
								onClick={onLogout}
							>
								<FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} />
								<span>Logout</span>
							</li>
						</ol>
					</div>
				</div>
				<h1 className="font-sans text-dark/60 text-sm border-t border-t-slate-300 w-full text-center py-[1rem]">
					Protected by guard routes
				</h1>
			</header>
			<div data-aos="zoom-in">
				<Outlet />
			</div>
		</section>
	);
};
