// Core
import { expectSaga } from 'redux-saga-test-plan';

import { api } from "../../../REST";
import { tasksActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { createTask } from "../saga/workers";
import { apply } from "redux-saga/effects";

describe('Create task saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(createTask)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.createTask, [__.message]), __.fetchResponseSuccess]])
            .put(tasksActions.createTask(__.task))
            .put(uiActions.stopFetching());
    });
    test('should complete a 400 status response scenario', async () => {
        await expectSaga(createTask)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.createTask, [__.message]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, "createTask worker"))
            .put(uiActions.stopFetching());
    });
});
