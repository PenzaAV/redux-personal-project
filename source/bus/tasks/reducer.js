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
                (task) => task.get('isEditState') === true)
                , (task) => task.set('isEditState', false));
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.UPDATE_TASK_MESSAGE:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
                , (task) => task.set('message', action.payload.message));
        case types.SET_NEW_TASK_MESSAGE:
            return state.update(state.findIndex(
                (task) => task.get('id') === action.payload.id)
            , (task) => task.set('newMessage', action.payload.message));

        case types.CLEAR_NEW_TASK_MESSAGE:
            return state.update(state.findIndex(
                (task) => task.get('newMessage'))
                , (task) => task.delete('newMessage'));
        default:
            return state;
    }
};
