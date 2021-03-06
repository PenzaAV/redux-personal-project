// Core
import { put, apply } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { tasksActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { setCompleteTask } from "../saga/workers";
import { expectSaga } from "redux-saga-test-plan";

const setCompleteTaskAction = tasksActions.setCompleteTaskAsync(__.task);

const saga = cloneableGenerator(setCompleteTask)(setCompleteTaskAction);

describe("Set Complete task saga:", () => {
    describe("should pass until response received", () => {
        test('should dispatch "startFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test("should call a fetch request", () => {
            expect(saga.next().value).toEqual(
                apply(api, api.updateTask, [{ ...__.task, completed: true }])
            );
        });
    });

    describe("should handle a 200 status response", () => {
        test("a fetch request should return 200 status response", () => {
            expect(saga.next(__.fetchResponseSuccess).value).toEqual(
                apply(__.fetchResponseSuccess, __.fetchResponseSuccess.json)
            );
        });
        test('should dispatch "updateTask" action', () => {
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
        await expectSaga(setCompleteTask, { payload: __.task })
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.updateTask, [
                        { ...__.task, completed: true }
                    ]),
                    __.fetchResponseFail400
                ]
            ])
            .put(uiActions.emitError(__.error, "setCompleteTask worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
