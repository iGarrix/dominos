import { IBaseErrorState, IThrowerResponse } from "../../../redux/reducers/Commons/reducer.commontypes";

export interface IDefToast {
    error: IBaseErrorState<IThrowerResponse> | null,
    type: "info" | "warning" | "error",
    seconds?: number,
}