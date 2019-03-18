// Types
import { types } from "./types";

export const tasksActions = {
    // Sync
    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (task) => {
        return {
            type:    types.CREATE_TASK,
            payload: task,
        };
    },
    removeTask: (taskId) => {
        return {
            type:    types.REMOVE_TASK,
            payload: taskId,
        };
    },
    updateTask: (task) => {
        return {
            type:    types.UPDATE_TASK,
            payload: task,
        };
    },
    setTaskNewMessage: (id, message) => {
        return {
            type:    types.SET_TASK_NEW_MESSAGE,
            payload: { id, message },
        };
    },
    clearTaskNewMessage: () => {
        return {
            type: types.CLEAR_TASK_NEW_MESSAGE,
        };
    },
    enableEditState: (task) => {
        return {
            type:    types.ENABLE_EDIT_STATE,
            payload: task,
        };
    },
    disableEditState: () => {
        return {
            type: types.DISABLE_EDIT_STATE,
        };
    },
    updateTaskMessage: (task) => {
        return {
            type:    types.UPDATE_TASK_MESSAGE,
            payload: task,
        };
    },
    completeAllTasks: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS,
            payload: tasks,
        };
    },
    // Async
    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },
    createTaskAsync: (text) => {
        return {
            type:    types.CREATE_TASK_ASYNC,
            payload: text,
        };
    },
    removeTaskAsync: (taskId) => {
        return {
            type:    types.REMOVE_TASK_ASYNC,
            payload: taskId,
        };
    },
    setCompleteTaskAsync: (task) => {
        return {
            type:    types.SET_COMPLETE_TASK_ASYNC,
            payload: task,
        };
    },
    unsetCompleteTaskAsync: (task) => {
        return {
            type:    types.UNSET_COMPLETE_TASK_ASYNC,
            payload: task,
        };
    },
    setFavoriteTaskAsync: (task) => {
        return {
            type:    types.SET_FAVORITE_TASK_ASYNC,
            payload: task,
        };
    },
    unsetFavoriteTaskAsync: (task) => {
        return {
            type:    types.UNSET_FAVORITE_TASK_ASYNC,
            payload: task,
        };
    },
    updateTaskMessageAsync: (task) => {
        return {
            type:    types.UPDATE_TASK_MESSAGE_ASYNC,
            payload: task,
        };
    },
    completeAllTasksAsync: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: tasks,
        };
    },
};
