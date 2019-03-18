// Core
import { expectSaga } from "redux-saga-test-plan";

import { api } from "../../../REST";
import { tasksActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { removeTask } from "../saga/workers";
import { apply } from "redux-saga/effects";

describe("Remove task saga:", () => {
    test("should complete a 200 status response scenario", async () => {
        await expectSaga(removeTask, { payload: __.taskId })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.removeTask, [__.taskId]),
                    __.fetchResponseSuccess204
                ]
            ])
            .put(tasksActions.removeTask(__.taskId))
            .put(uiActions.stopFetching())
            .run();
    });
    test("should complete a 400 status response scenario", async () => {
        await expectSaga(removeTask, { payload: __.taskId })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.removeTask, [__.taskId]),
                    __.fetchResponseFail400
                ]
            ])
            .put(uiActions.emitError(__.error, "removeTask worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
