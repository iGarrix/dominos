import { IngradientCard } from '../../../components/Cards/IngradientCard';
import { ingradients } from '../../../configurations/global.conf';
import style from './overviewadmingradientview.module.scss';

export const OverviewAdmIngradientView: React.FC = () => {
	return (
		<section className={style.overviewadmingradientview}>
			<div className="bg-light py-[4vh] px-[5%] border-b border-b-slate-300">
				<h1 className="uppercase font-rubik text-2xl">Ingradients</h1>
			</div>
			<div className="grid grid-cols-6 px-[2vh] py-[2vh] gap-[1rem] w-full">
				{ingradients.map((item, index) => {
					return <IngradientCard key={index} index={index} ingradient={item} />;
				})}
			</div>
		</section>
	);
};
