import { AppDispatch } from '../../store';
import {
	ErrorHandler,
	IBaseErrorState,
	IThrowerResponse,
} from '../Commons/reducer.commontypes';
import { basicSlice } from './basic.slice';
import { IPizza } from './basic.types';

const AddPizzaToCard = (_request: IPizza) => async (dispatch: AppDispatch) => {
	try {
		dispatch(basicSlice.actions.onLoading(true));
		dispatch(basicSlice.actions.onAddObject(_request));
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(basicSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};
const ClearCard = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(basicSlice.actions.onDispose());
	} catch (error) {
		const errorHandled: IBaseErrorState<IThrowerResponse> = ErrorHandler(error);
		dispatch(basicSlice.actions.onError(errorHandled));
		throw errorHandled;
	}
};

export const ReduxBasicActions = {
	AddPizzaToCard: (_request: IPizza) => AddPizzaToCard(_request),
	ClearCard: () => ClearCard(),
};
