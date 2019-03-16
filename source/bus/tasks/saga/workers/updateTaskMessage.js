// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { uiActions } from "../../../ui/actions";
import { taskShape } from "../../../../instruments/helpers";

export function* updateTaskMessage ({ payload: task }) {
    console.log(task);
    try {
        yield put(uiActions.startFetching());

        const renewedTask = yield apply(taskShape, taskShape, [task]);

        const response = yield apply(api, api.updateTask, [renewedTask]);
        const{ data: updatedTask, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.disableEditState());
        yield put(tasksActions.clearTaskNewMessage());
        yield put(tasksActions.updateTaskMessage(updatedTask));
    } catch (error) {
        yield put(uiActions.emitError(error, "setFavoriteTask worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
