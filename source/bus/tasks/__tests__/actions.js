import { tasksActions } from "../actions";

describe('Tasks actions', () => {
    test('fillTasks', () => {
        expect(tasksActions.fillTasks(__.tasks)).toMatchSnapshot();
    });
    test('createTask', () => {
        expect(tasksActions.createTask(__.task)).toMatchSnapshot();
    });
    test('removeTask', () => {
        expect(tasksActions.removeTask(__.taskId)).toMatchSnapshot();
    });
    test('setTaskNewMessage', () => {
        expect(tasksActions.setTaskNewMessage(__.taskId, __.message)).toMatchSnapshot();
    });
    test('clearTaskNewMessage', () => {
        expect(tasksActions.clearTaskNewMessage()).toMatchSnapshot();
    });
    test('enableEditState', () => {
        expect(tasksActions.enableEditState()).toMatchSnapshot();
    });
    test('disableEditState', () => {
        expect(tasksActions.disableEditState()).toMatchSnapshot();
    });
    test('updateTaskMessage', () => {
        expect(tasksActions.updateTaskMessage(__.task)).toMatchSnapshot();
    });
    test('completeAllTasks', () => {
        expect(tasksActions.completeAllTasks(__.tasks)).toMatchSnapshot();
    });
    test('fetchTasksAsync', () => {
        expect(tasksActions.fetchTasksAsync()).toMatchSnapshot();
    });
    test('createTaskAsync', () => {
        expect(tasksActions.createTaskAsync(__.message)).toMatchSnapshot();
    });
    test('removeTaskAsync', () => {
        expect(tasksActions.removeTaskAsync(__.taskId)).toMatchSnapshot();
    });
    test('setCompleteTaskAsync', () => {
        expect(tasksActions.setCompleteTaskAsync(__.task)).toMatchSnapshot();
    });
    test('unsetCompleteTaskAsync', () => {
        expect(tasksActions.unsetCompleteTaskAsync(__.task)).toMatchSnapshot();
    });
    test('setFavoriteTaskAsync', () => {
        expect(tasksActions.setFavoriteTaskAsync(__.task)).toMatchSnapshot();
    });
    test('unsetFavoriteTaskAsync', () => {
        expect(tasksActions.unsetFavoriteTaskAsync(__.task)).toMatchSnapshot();
    });
    test('updateTaskMessageAsync', () => {
        expect(tasksActions.updateTaskMessageAsync(__.task)).toMatchSnapshot();
    });
    test('completeAllTasksAsync', () => {
        expect(tasksActions.completeAllTasksAsync(__.tasks)).toMatchSnapshot();
    });

});
