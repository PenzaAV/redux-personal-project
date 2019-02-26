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
};
