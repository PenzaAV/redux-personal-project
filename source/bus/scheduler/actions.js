// Types
import { types } from "./types";

export const schedulerActions = {
    updateTasksFilter: (filter) => {
        return {
            type:    types.UPDATE_TASKS_FILTER,
            payload: filter,
        };
    },
    setAllTasksAsCompleted: () => {
        return {
            type: types.SET_ALL_TASKS_AS_COMPLETED,
        };
    },
    unsetAllTasksAsCompleted: () => {
        return {
            type: types.UNSET_ALL_TASKS_AS_COMPLETED,
        };
    },
    checkIsAllTasksCompleted: (tasks) => {
        return {
            type:    types.CHECK_IS_ALL_TASKS_COMPLETED,
            payload: tasks,
        };
    },
};
