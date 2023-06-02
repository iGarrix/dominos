import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNav: any = (path: any, isScroll = true) => {
	const nav = useNavigate();

	useEffect(() => {
		if (isScroll) {
			window.document.documentElement.scrollTo(0, 0);
		}
	}, [nav]);

	return nav;
};
