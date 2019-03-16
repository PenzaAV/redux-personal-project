import { tasksReducer } from "../reducer";
import { tasksActions } from "../actions";
import { filterTasksByMessage } from "../../../instruments/helpers";

describe("tasks reducer", () => {
    test("should return initial state by default", () => {
        expect(tasksReducer(void 0, {})).toMatchSnapshot();
    });

    test("should handle FILL_TASKS action", () => {
        expect(tasksReducer( void 0, tasksActions.fillTasks(__.tasks))).toMatchSnapshot();
    });
    test("should handle CREATE_TASK action", () => {
        expect(tasksReducer(void 0, tasksActions.createTask(__.task))).toMatchSnapshot();
    });
    test("should handle REMOVE_TASK action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.removeTask(__.taskId))).toMatchSnapshot();
    });
    test("should handle UPDATE_TASK action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.updateTask([__.task]))).toMatchSnapshot();
    });
    test("should handle SET_TASK_NEW_MESSAGE action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.setTaskNewMessage(__.taskId, __.message))).toMatchSnapshot();
    });
    test("should handle CLEAR_TASK_NEW_MESSAGE action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.clearTaskNewMessage())).toMatchSnapshot();
    });
    test("should handle ENABLE_EDIT_STATE action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.enableEditState(__.task))).toMatchSnapshot();
    });
    test("should handle DISABLE_EDIT_STATE action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.disableEditState())).toMatchSnapshot();
    });
    test("should handle UPDATE_TASK_MESSAGE action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.updateTaskMessage([__.task]))).toMatchSnapshot();
    });
    test("should handle COMPLETE_ALL_TASKS action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.completeAllTasks(__.tasks))).toMatchSnapshot();
    });
    test("should handle FETCH_TASKS_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.fetchTasksAsync(__.tasks))).toMatchSnapshot();
    });
    test("should handle CREATE_TASK_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.createTaskAsync(__.message))).toMatchSnapshot();
    });
    test("should handle REMOVE_TASK_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.removeTaskAsync(__.taskId))).toMatchSnapshot();
    });
    test("should handle SET_COMPLETE_TASK_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.setCompleteTaskAsync(__.task))).toMatchSnapshot();
    });
    test("should handle UNSET_COMPLETE_TASK_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.unsetCompleteTaskAsync(__.task))).toMatchSnapshot();
    });
    test("should handle SET_FAVORITE_TASK_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.setFavoriteTaskAsync(__.task))).toMatchSnapshot();
    });
    test("should handle UNSET_FAVORITE_TASK_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.unsetFavoriteTaskAsync(__.task))).toMatchSnapshot();
    });
    test("should handle UPDATE_TASK_MESSAGE_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.updateTaskMessageAsync(__.task))).toMatchSnapshot();
    });
    test("should handle COMPLETE_ALL_TASKS_ASYNC action", () => {
        expect(tasksReducer(__.tasksState, tasksActions.completeAllTasksAsync(__.tasks))).toMatchSnapshot();
    });
    test("should handle FILTER_TASK_BY_MESSAGE action", () => {
        expect(tasksReducer(__.tasksState, filterTasksByMessage(__.tasksState, __.message))).toMatchSnapshot();
    });
});
