// Core
import { put } from "redux-saga/effects";
// Actions
import { schedulerActions } from "../../../scheduler/actions";

export function* checkIsAllCompleted ({ payload: tasks }) {
    const uncompleted = yield tasks.find((task) => {
        return task.get('completed') === false;
    });

    if (uncompleted) {
        yield put(schedulerActions.unsetAllTasksAsCompleted());
    } else {
        yield put(schedulerActions.setAllTasksAsCompleted());
    }
}
