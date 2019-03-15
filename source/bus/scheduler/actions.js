// Types
import { types } from "./types";

export const schedulerActions = {
    updateNewTaskMessage: (value) => {
        return {
            type:    types.UPDATE_NEW_TASK_MESSAGE,
            payload: value,
        };
    },
    updateTasksFilter: (value) => {
        return {
            type:    types.UPDATE_TASKS_FILTER,
            payload: value,
        };
    },
};
