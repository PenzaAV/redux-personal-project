// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";
// Workers
import { createTask, fetchTasks, removeTask, setCompleteTask, unsetCompleteTask, setFavoriteTask, unsetFavoriteTask, updateTaskMessage } from "./workers";

function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

function* watchRemoveTask () {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

function* watchSetCompeteTask () {
    yield takeEvery(types.SET_COMPLETE_TASK_ASYNC, setCompleteTask);
}

function* watchUnsetCompeteTask () {
    yield takeEvery(types.UNSET_COMPLETE_TASK_ASYNC, unsetCompleteTask);
}

function* watchSetFavoriteTask () {
    yield takeEvery(types.SET_FAVORITE_TASK_ASYNC, setFavoriteTask);
}
function* watchUnsetFavoriteTask () {
    yield takeEvery(types.UNSET_FAVORITE_TASK_ASYNC, unsetFavoriteTask);
}
function* watchUpdateTaskMessage () {
    yield takeEvery(types.UPDATE_TASK_MESSAGE_ASYNC, updateTaskMessage);
}
export function* watchTasks () {
    yield all([
        call(watchCreateTask),
        call(watchFetchTasks),
        call(watchRemoveTask),
        call(watchUnsetCompeteTask),
        call(watchSetCompeteTask),
        call(watchSetFavoriteTask),
        call(watchUnsetFavoriteTask),
        call(watchUpdateTaskMessage)
    ]);
}
