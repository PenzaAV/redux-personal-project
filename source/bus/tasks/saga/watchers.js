// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";
// Workers
import { createTask, fetchTasks, removeTask } from "./workers";

function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

function* watchRemoveTask () {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

export function* watchTasks () {
    yield all([call(watchCreateTask), call(watchFetchTasks), call(watchRemoveTask)]);
}
