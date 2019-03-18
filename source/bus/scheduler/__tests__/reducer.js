import { schedulerReducer } from "../reducer";
import { schedulerActions } from "../actions";

describe("scheduler reducer", () => {
    test("should return initial state by default", () => {
        expect(schedulerReducer(void 0, {})).toMatchSnapshot();
    });
    test("should handle UPDATE_NEW_TASK_MESSAGE action", () => {
        expect(
            schedulerReducer(
                void 0,
                schedulerActions.updateNewTaskMessage(__.message)
            )
        ).toMatchSnapshot();
    });
    test("should handle UPDATE_TASKS_FILTER action", () => {
        expect(
            schedulerReducer(
                void 0,
                schedulerActions.updateTasksFilter(__.message)
            )
        ).toMatchSnapshot();
    });
});
