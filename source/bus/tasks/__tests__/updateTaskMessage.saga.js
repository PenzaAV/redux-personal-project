// Core
import { put, apply } from "redux-saga/effects";
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { tasksActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { updateTaskMessage } from "../saga/workers";
import { expectSaga } from "redux-saga-test-plan";

const updateTaskMessageAction = tasksActions.updateTaskMessageAsync(__.task);

const saga = cloneableGenerator(updateTaskMessage)(updateTaskMessageAction);

describe('Update task message saga:', () => {
    describe("should pass until response received", () => {

        test('should dispatch "startFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test("should call a fetch request", () => {
            expect(saga.next().value).toEqual(
                apply(api, api.updateTask, [__.task])
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
        test('should dispatch "disableEditState" action', () => {
            expect(saga.next().value).toEqual(put(tasksActions.disableEditState()));
        });
        test('should dispatch "clearTaskNewMessage" action', () => {
            expect(saga.next().value).toEqual(put(tasksActions.clearTaskNewMessage()));
        });

        test('should dispatch "stopFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.stopFetching()));
        });

        test("should finish", () => {
            expect(saga.next().done).toBe(true);
        });

    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(updateTaskMessage, { payload: __.task })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.updateTask, [{ ...__.task }]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, "updateTaskMessage worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
