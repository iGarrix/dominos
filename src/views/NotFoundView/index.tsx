import { useLocation, useNavigate } from 'react-router-dom';
import style from './notfoundview.module.scss';

export const NotFoundView: React.FC = () => {
	const history = useLocation();
	const nav = useNavigate();

	return (
		<section className={`${style.notfoundview} init`}>
			<img
				src="https://e0.pxfuel.com/wallpapers/143/974/desktop-wallpaper-love-pizza-fur-balls-and-cute-shit-pizzas-cool-pizza-thumbnail.jpg"
				alt="bg"
				className="absolute top-0 left-0 w-full h-full object-cover"
			/>
			<div className="w-screen h-screen backdrop-blur-lg flex flex-col gap-[2rem] items-center justify-center bg-dark/30 px-[40%]">
				<h1 className="text-3xl font-bold font-rubik text-light tracking-wider text-center">
					Search for: {history.pathname.replace('/', '')}, not found
				</h1>
				<hr></hr>
				<button
					className={style.btn}
					onClick={() => {
						nav(-1);
					}}
				>
					<div className={style.wrapper}>Go back</div>
				</button>
			</div>
		</section>
	);
};
