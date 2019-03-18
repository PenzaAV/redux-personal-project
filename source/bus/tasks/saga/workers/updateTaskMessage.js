// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { uiActions } from "../../../ui/actions";

export function* updateTaskMessage ({ payload: task }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.updateTask, [task]);
        const { data: updatedTask, message } = yield apply(
            response,
            response.json
        );

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.updateTask(updatedTask));
        yield put(tasksActions.disableEditState());
        yield put(tasksActions.clearTaskNewMessage());
    } catch (error) {
        yield put(uiActions.emitError(error, "updateTaskMessage worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
