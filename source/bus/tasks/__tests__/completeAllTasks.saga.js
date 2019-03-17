// Core
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from "../../../REST";
import { uiActions } from "../../ui/actions";
import { tasksActions } from "../actions";
import { completeAllTasks } from '../saga/workers';
import { getUncompleted } from "../../../instruments/helpers";
import { apply } from "redux-saga/effects";

describe('complete all tasks saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(completeAllTasks, { payload: __.tasksState })
            .put(uiActions.startFetching())
            .apply(getUncompleted, getUncompleted, [__.tasksState])
            .provide([[apply(api, api.completeAllTasks, [__.uncompletedTasksState.toJS()]), __.promiseAllResponseSuccess]])
            .put(tasksActions.completeAllTasks())
            .put(uiActions.stopFetching())
            .run();
    });
    test('should complete a 400 status response scenario', async () => {
        await expectSaga(completeAllTasks, { payload: __.tasksState })
            .put(uiActions.startFetching())
            .apply(getUncompleted, getUncompleted, [__.tasksState])
            .provide([[apply(api, api.completeAllTasks, [__.uncompletedTasksState.toJS()]), __.promiseAllResponseError]])
            .put(uiActions.emitError(__.error, "completeAllTasks worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
