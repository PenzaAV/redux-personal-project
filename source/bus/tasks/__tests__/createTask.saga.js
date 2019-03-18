// Core
import { expectSaga } from "redux-saga-test-plan";
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../REST";
import { tasksActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { createTask } from "../saga/workers";
import { cloneableGenerator } from "redux-saga/utils";

const createTaskAsyncAction = tasksActions.createTaskAsync(__.message);

const saga = cloneableGenerator(createTask)(createTaskAsyncAction);

describe("Create task saga:", () => {
    describe("should pass until response received", () => {
        test('should dispatch "startFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test("should call a fetch request", () => {
            expect(saga.next().value).toEqual(
                apply(api, api.createTask, [__.message])
            );
        });
    });

    describe("should handle a 200 status response", () => {
        test("a fetch request should return 200 status response", () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });
        test('should dispatch "createTask" action', () => {
            expect(saga.next(__.responseDataSuccess).value).toMatchSnapshot();
        });

        test('should dispatch "stopFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(saga.next().done).toBe(true);
        });
    });
    test("should complete a 400 status response scenario", async () => {
        await expectSaga(createTask, { payload: __.message })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.createTask, [__.message]),
                    __.fetchResponseFail400
                ]
            ])
            .put(uiActions.emitError(__.error, "createTask worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
