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
    enableEditState: (task) => {
        return {
            type:    types.ENABLE_EDIT_STATE,
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
    updateTaskAsync: (task, meta) => {
        return {
            type:    types.UPDATE_TASK_ASYNC,
            payload: task,
            meta,
        };
    },
};
