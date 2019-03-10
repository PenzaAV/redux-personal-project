// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { tasksActions } from "../../actions";
import { uiActions } from "../../../ui/actions";
import { taskShape } from "../../../../instruments/helpers";

export function* setFavoriteTask ({ payload: task }) {
    try {
        yield put(uiActions.startFetching());
        const favoriteTask = taskShape({
            ...task,
            favorite: true,
        });

        const response = yield apply(api, api.updateTask, [favoriteTask]);
        const { data: updatedTask, message } = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.setFavoriteTask(updatedTask[0]));
    } catch (error) {
        yield put(uiActions.emitError(error, "setFavoriteTask worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
