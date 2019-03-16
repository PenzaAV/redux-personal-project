// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { uiActions } from "../../../ui/actions";
import { tasksActions } from "../../actions";
import { getUncompleted } from "../../../../instruments/helpers";

export function* completeAllTasks ({ payload: tasks }) {
    try {
        yield put(uiActions.startFetching());

        const uncompleted = yield apply(getUncompleted, getUncompleted, [tasks]);
        const responses = yield apply(api, api.completeAllTasks, [uncompleted.toJS()]);

        if (responses.some((response) => response.status !== 200)) {
            const failed = responses.find((response) => response.status !== 200);

            throw new Error(failed.message);
        }

        yield put(tasksActions.completeAllTasks());
    } catch (error) {

        yield put(uiActions.emitError(error, "completeAllTasks worker"));
    } finally {
        yield put(uiActions.stopFetching());
    }

}
