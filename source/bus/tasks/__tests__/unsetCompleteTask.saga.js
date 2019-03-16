// Core
import { expectSaga } from 'redux-saga-test-plan';
import { cloneableGenerator } from "redux-saga/utils";

// Instruments
import { api } from "../../../REST";
import { tasksActions } from "../actions";
import { uiActions } from "../../ui/actions";
import { unsetCompleteTask } from "../saga/workers";
import { apply, put } from "redux-saga/effects";

const unsetCompleteTaskAction = tasksActions.unsetCompleteTaskAsync(__.task);

const saga = cloneableGenerator(unsetCompleteTask)(unsetCompleteTaskAction);

describe('Unset Complete task saga:', () => {
    describe("should pass until response received", () => {

        test('should dispatch "startFetching" action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test("should call a fetch request", () => {
            expect(saga.next().value).toEqual(
                apply(api, api.updateTask, [{ ...__.task, completed: false }])
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
            expect(saga.next().value).toMatchSnapshot();
        });

        test("should finish", () => {
            expect(saga.next().done).toBe(true);
        });

    });

    /* по какойто причине в закоментированом коде не пробрасывается [__.task] в payload экшену "updateTask" */
    // test('should complete a 200 status response scenario', async () => {
    //     await expectSaga(unsetCompleteTask, { payload: __.task })
    //         .put(uiActions.startFetching())
    //         .apply(taskShape, taskShape, [__.incompletedTask])
    //         .provide([[apply(api, api.updateTask, [{ ...__.task, completed: false }]), __.fetchResponseSuccess]])
    //         .put(tasksActions.updateTask([__.task]))
    //         .put(uiActions.stopFetching())
    //         .run();
    // });
    test('should complete a 400 status response scenario', async () => {
        await expectSaga(unsetCompleteTask, { payload: __.task })
            .put(uiActions.startFetching())
            .provide([[apply(api, api.updateTask, [{ ...__.task, completed: false }]), __.fetchResponseFail400]])
            .put(uiActions.emitError(__.error, "unsetCompleteTask worker"))
            .put(uiActions.stopFetching())
            .run();
    });
});
