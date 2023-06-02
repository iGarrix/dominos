import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './mainheader.module.scss';
import {
	faCartShopping,
	faCircleHalfStroke,
	faClockRotateLeft,
	faDatabase,
	faPizzaSlice,
	faTag,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import './mainheader.visible.css';
import { useLocation } from 'react-router-dom';
import { useNav } from '../../../hooks/useNav/useNav';
import { useAppSelector } from '../../../redux/hooks/hooks';

export const MainHeader: React.FC = () => {
	const nav = useNav();
	const history = useLocation();

	const { cart } = useAppSelector(state => state.basicReducer);
	const { authorized } = useAppSelector(state => state.authReducer);

	return (
		<header className={`${style.mainheader} visibility`} id="#header">
			<div className={style.headwrap}>
				<h1
					className={style.logo}
					onClick={() => {
						nav('/');
					}}
				>
					domino`s
				</h1>
				<ol className={style.itemofmenu}>
					<li
						className={style.item}
						onClick={() => {
							nav('/');
						}}
					>
						<div
							className={`${style.wrap} ${
								history.pathname === '/' ? style.select : null
							}`}
						>
							Domino
						</div>
					</li>
					<div className={`${style.submenu}`}>
						<a
							href="#actions"
							className={`${style.item} ${style.subtrigger}`}
							onClick={() => {
								nav('/');
							}}
						>
							<div className={style.wrap}>Actions</div>
						</a>
						<div className={`${style.subwrap}`}>
							<div className={`${style.doublewrap}`}>
								<div className={`${style.whitebox}`}></div>
								<div className={`${style.contentbox}`}>
									<a
										href="#latest"
										className={style.boxitem}
										onClick={() => {
											nav('/');
										}}
									>
										<FontAwesomeIcon icon={faPizzaSlice} /> New taste of pizza
										for you
									</a>
									<a
										href="#discount"
										className={style.boxitem}
										onClick={() => {
											nav('/');
										}}
									>
										<FontAwesomeIcon icon={faTag} /> Large discount on pizza
									</a>
								</div>
							</div>
						</div>
					</div>
					<li
						className={style.item}
						onClick={() => {
							nav('/allpizza');
						}}
					>
						<div
							className={`${style.wrap} ${
								history.pathname === '/allpizza' ? style.select : null
							}`}
						>
							All pizza
						</div>
					</li>
					<li
						className={style.item}
						onClick={() => {
							nav('/ingradients');
						}}
					>
						<div
							className={`${style.wrap} ${
								history.pathname === '/ingradients' ? style.select : null
							}`}
						>
							Ingradients
						</div>
					</li>
				</ol>
				<ol className={style.secondarymenu}>
					{/* <li
						className={style.item}
						onClick={() => {
							console.log('change theme');
						}}
					>
						<FontAwesomeIcon icon={faCircleHalfStroke}></FontAwesomeIcon>
					</li> */}
					<li
						className={`${style.item} relative`}
						onClick={() => {
							nav('/history');
						}}
					>
						<FontAwesomeIcon icon={faClockRotateLeft}></FontAwesomeIcon>
					</li>
					<li
						className={`${style.item} relative`}
						onClick={() => {
							nav('/cart');
						}}
					>
						{cart && (
							<h2 className="absolute top-[-10px] right-[-16px] bg-grapefruit rounded-full w-[20px] h-[20px] text-[14px] leading-none text-center flex items-center justify-center font-quicksand text-white">
								{cart.length}
							</h2>
						)}
						<FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
					</li>
					<li
						className={style.item}
						onClick={() => {
							nav('/login');
						}}
					>
						{authorized ? (
							<FontAwesomeIcon icon={faDatabase}></FontAwesomeIcon>
						) : (
							<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
						)}
					</li>
				</ol>
			</div>
		</header>
	);
};
