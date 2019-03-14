// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";
// Workers
import { checkIsAllCompleted } from "./workers";

function* watchCheckIsAllCompletedTask () {
    yield takeEvery(types.CHECK_IS_ALL_TASKS_COMPLETED, checkIsAllCompleted);
}
export function* watchScheduler () {
    yield all([
        call(watchCheckIsAllCompletedTask),
    ]);
}
