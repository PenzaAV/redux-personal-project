// Core
import { expectSaga } from 'redux-saga-test-plan';
import { apply, put } from "redux-saga/effects";

// Instruments
import { api } from "../../../REST";
import { tasksActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { fetchTasks } from "../saga/workers";

import { cloneableGenerator } from "redux-saga/utils";

const fetchTaskAsyncAction = tasksActions.fetchTasksAsync(__.task);

const saga = cloneableGenerator(fetchTasks)(fetchTaskAsyncAction);

describe('Fetch tasks saga:', () => {
    describe("should pass until response received", () => {

        test('should dispatch "startFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test("should call a fetch request", () => {
            expect(saga.next().value).toEqual(
                apply(api, api.fetchTasks)
            );
        });
    });

    describe("should handle a 200 status response", () => {
        test("a fetch request should return 200 status response", () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });
        test('should dispatch "fillTasks" action', () => {
            expect(saga.next(__.responseDataSuccess).value).toMatchSnapshot();
        });

        test('should dispatch "stopFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(saga.next().done).toBe(true);
        });

    });
    test('should complete a 400 status response scenario', async () => {
        await expectSaga(fetchTasks)
            .provide([[apply(api, api.fetchTasks), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, "fetchTasks worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
