// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from "./types";

const initialState = List();

export const tasksReducer =  (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);
        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);
        case types.SET_COMPLETE_TASK:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
                , (task) => task.merge(action.payload));
        case types.UNSET_COMPLETE_TASK:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
                , (task) => task.merge(action.payload));
        case types.SET_FAVORITE_TASK:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
                , (task) => task.merge(action.payload));
        case types.UNSET_FAVORITE_TASK:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
                , (task) => task.merge(action.payload));
        case types.ENABLE_EDIT_STATE:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
                , (task) => task.set('isEditState', true));
        case types.DISABLE_EDIT_STATE:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
                , (task) => task.set('isEditState', false));
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        default:
            return state;
    }
};
