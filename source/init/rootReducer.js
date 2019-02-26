//core
import { combineReducers } from "redux";

//reducers
import { uiReducer as ui } from "../bus/ui/reducer";
import { tasksReducer as tasks } from "../bus/tasks/reducer";

export const rootReducer = combineReducers({
    ui,
    tasks,
});
