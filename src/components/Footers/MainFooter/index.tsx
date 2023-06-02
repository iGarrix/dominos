import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './mainfooter.module.scss';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

export const MainFooter: React.FC = () => {
	return (
		<footer className={style.mainfooter}>
			<h1 className={style.title}>
				domino {new Date().getFullYear()}
				<FontAwesomeIcon icon={faCopyright} />
			</h1>
		</footer>
	);
};
