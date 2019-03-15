// Core
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from "../../../REST";
import { uiActions } from "../../ui/actions";
import { tasksActions } from "../actions";
import { completeAllTasks } from '../saga/workers';
import { getUncompleted } from "../../../instruments/helpers";
import { apply, put } from "redux-saga/effects";

describe('complete all tasks saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(completeAllTasks)
            .put(uiActions.startFetching())
            .apply(getUncompleted, getUncompleted, [__.tasksState])
            .apply(api, api.completeAllTasks, [__.tasksState.toJS()])
            .put(tasksActions.completeAllTasks())
            .put(uiActions.stopFetching());
    });
    test('should complete a 400 status response scenario', async () => {
        await expectSaga(completeAllTasks)
            .put(uiActions.startFetching())
            .apply(getUncompleted, getUncompleted, [__.tasksState])
            .provide([[apply(api, api.completeAllTasks, [__.tasksState.toJS()]), __.promiseAllResponseError]])
            .put(uiActions.emitError(__.error, "completeAllTasks worker"))
            .put(uiActions.stopFetching());
    });
});
