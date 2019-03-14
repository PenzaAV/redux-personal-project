// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { uiActions } from "../../../ui/actions";
import { tasksActions } from "../../actions";

export function* completeAllTasks ({ payload: tasks }) {
    try {
        const uncompleted = tasks.filter((task) => {
            return task.get('completed') === false;
        });

        yield apply(api, api.completeAllTasks, [uncompleted.toJS()]);
        yield put(tasksActions.completeAllTasks());
    } catch (error) {
        yield put(uiActions.emitError(error, "completeAllTasks worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
