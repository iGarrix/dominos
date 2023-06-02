/* eslint-disable @typescript-eslint/no-empty-function */
import ReactPaginate from 'react-paginate';
import { IPaginatorProps } from './types';

import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const Paginator: React.FC<IPaginatorProps> = ({ ...props }) => {
	return (
		<ReactPaginate
			breakLabel="..."
			initialPage={props.initialPage ? props.initialPage - 1 : 0}
			nextLabel={<FontAwesomeIcon className="text-xl" icon={faAngleRight} />}
			previousLabel={<FontAwesomeIcon className="text-xl" icon={faAngleLeft} />}
			onPageChange={(e: any) => {
				props.onPaginate(e.selected + 1);
			}}
			pageRangeDisplayed={5}
			marginPagesDisplayed={2}
			pageCount={props.total}
			className="paginator__classname"
			nextClassName="paginator__next"
			pageClassName="paginator__page"
			breakClassName="paginator__break"
			activeClassName="paginator__active"
			disabledClassName="paginator__disabled"
			nextLinkClassName="paginator__nextLink"
			pageLinkClassName="paginator__pageLink"
			previousClassName="paginator__previous"
			breakLinkClassName="paginator__breakLink"
			activeLinkClassName="paginator__activeLink"
			containerClassName="paginator__container"
			disabledLinkClassName="paginator__disabledLink"
			previousLinkClassName="paginator__previousLink"
			renderOnZeroPageCount={() => {}}
		/>
	);
};
