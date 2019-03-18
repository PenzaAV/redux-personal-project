import { schedulerActions } from "../actions";

describe("Scheduler actions", () => {
    test("updateNewTaskMessage", () => {
        expect(
            schedulerActions.updateNewTaskMessage(__.message)
        ).toMatchSnapshot();
    });
    test("updateTasksFilter", () => {
        expect(
            schedulerActions.updateTasksFilter(__.message)
        ).toMatchSnapshot();
    });
});
