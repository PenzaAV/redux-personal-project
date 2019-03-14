// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { schedulerActions} from "../../../scheduler/actions";
import { uiActions } from "../../../ui/actions";
import { fromJS } from "immutable";

export function* fetchTasks () {
    try {
        yield put(uiActions.startFetching());
        const response = yield apply(api, api.fetchTasks);
        const { data: tasks, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }
        yield put(tasksActions.fillTasks(tasks));
        yield put(schedulerActions.checkIsAllTasksCompleted(fromJS(tasks)));
    } catch (error) {
        yield put(uiActions.emitError(error, "fetchTasks worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
