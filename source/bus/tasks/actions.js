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
    setCompleteTask: (task) => {
        return {
            type:    types.SET_COMPLETE_TASK,
            payload: task,
        };
    },
    unsetCompleteTask: (task) => {
        return {
            type:    types.UNSET_COMPLETE_TASK,
            payload: task,
        };
    },
    setFavoriteTask: (task) => {
        return {
            type:    types.SET_FAVORITE_TASK,
            payload: task,
        };
    },
    unsetFavoriteTask: (task) => {
        return {
            type:    types.UNSET_FAVORITE_TASK,
            payload: task,
        };
    },
    setNewTaskMessage: (task) => {
        return {
            type:    types.SET_NEW_TASK_MESSAGE,
            payload: task,
        };
    },
    enableEditState: (task) => {
        return {
            type:    types.ENABLE_EDIT_STATE,
            payload: task,
        };
    },
    disableEditState: (task) => {
        return {
            type:    types.DISABLE_EDIT_STATE,
            payload: task,
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
};
