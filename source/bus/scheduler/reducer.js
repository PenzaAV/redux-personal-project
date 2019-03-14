// Core
import { Map } from "immutable";

// Types
import { types } from "./types";

const initialState = Map({
    tasksFilter:       '',
    allTasksCompleted: false,
});

export const schedulerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_TASKS_FILTER:
            return state.set("tasksFilter", action.payload);
        case types.SET_ALL_TASKS_AS_COMPLETED:
            return state.set("allTasksCompleted", true);
        case types.UNSET_ALL_TASKS_AS_COMPLETED:
            return state.set("allTasksCompleted", false);
        default:
            return state;
    }
};
