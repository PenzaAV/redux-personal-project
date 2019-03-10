// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* unsetCompleteTask ({ payload: task }) {
    try {
        yield put(uiActions.startFetching());
        const incompletedTask = {
            ...task,
            completed: false,
        };
        const response = yield apply(api, api.updateTask, [incompletedTask]);
        const { data: updatedTask, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.unsetCompleteTask(updatedTask[0]));
    } catch (error) {
        yield put(uiActions.emitError(error, "unsetCompleteTask worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
