export interface IPaginatorProps {
	total: number;
	initialPage?: number;
	onPaginate: (e: number) => void;
}
