// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { uiActions } from "../../../ui/actions";
import { taskShape } from "../../../../instruments/helpers";

export function* setCompleteTask ({ payload: task }) {
    try {
        yield put(uiActions.startFetching());
        const completedTask = taskShape({
            ...task,
            completed: true,
        });

        const response = yield apply(api, api.updateTask, [completedTask]);
        const { data: updatedTask, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.setCompleteTask(updatedTask[0]));
    } catch (error) {
        yield put(uiActions.emitError(error, "setCompleteTask worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
