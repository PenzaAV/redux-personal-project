//core
import { combineReducers } from "redux";

//reducers
import { uiReducer as ui } from "../bus/ui/reducer";
export const rootReducer = combineReducers({
    ui,
});
