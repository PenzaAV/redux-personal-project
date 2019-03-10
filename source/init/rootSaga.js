// Core
import { all, call } from "redux-saga/effects";

// // Watchers
 import { watchTasks } from "../bus/tasks/saga/watchers";
// import { watchAuth } from "../bus/auth/saga/watchers";
// import { watchUsers } from "../bus/users/saga/watchers";

export function* rootSaga () {
    yield all([call(watchTasks)]);
}