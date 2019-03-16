/* Setup files module.
**
** This module will be executed before each test.
**
** This module contains a code to configure or set up the
** testing environment before each test. Since every test
** runs in its own environment, these scripts will be
** executed in the testing environment immediately before
** executing the test code itself.
**
** This module excutes before setupFramework module.
**
*/

import { LocalStorage } from './mocks/localStorage';
import { fromJS, List, Map } from "immutable";
import { taskShape as shape } from "../../source/instruments/helpers";

const successMessage = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const message = 'test message';
const tasks = [
    {
        id:        'test_task_id',
        message:   "test_task_message",
        completed: false,
        favorite:  false,
        created:   "2019-03-15T11:08:49.411Z",
    },
    {
        id:        'test_task_2_id',
        message:   "test_task_2_message",
        completed: true,
        favorite:  false,
        created:   "2019-03-15T11:08:49.411Z",
    }
];
const tasksState = fromJS(tasks);
const uncompletedTasksState = tasksState.filter((task) => {
    return task.get('completed') === false;
});

const task = {
    id:        'test_task_id',
    message:   "test_task_message",
    completed: false,
    favorite:  false,
    created:   "2019-03-15T11:08:49.411Z",
};
const completedTask = {
    ...task,
    completed: true,
};
const incompletedTask = {
    ...task,
    completed: false,
};
const favoriteTask = {
    ...task,
    favorite: true,
};
const unfavoriteTask = {
    ...task,
    favorite: false,
};

const taskShape = shape(task);

const taskId = 'test_task_id';

const responseDataFail = {
    message: errorMessage,
};
const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(task)),
};

const fetchResponseSuccess204 = {
    status: 204,
};

const responseDataSuccess = {
    data:    task,
    message: successMessage,
};
const fetchResponseFail401 = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const promiseAllResponseError = [
    responseDataFail
];
const promiseAllResponseSuccess = [
    {
        status: 200,
    }
];
const error = new Error(errorMessage);

global.__ = {
    message,
    taskShape,
    responseDataSuccess,
    tasks,
    task,
    completedTask,
    incompletedTask,
    favoriteTask,
    unfavoriteTask,
    taskId,
    tasksState,
    fetchResponseSuccess,
    promiseAllResponseError,
    promiseAllResponseSuccess,
    error,
    fetchResponseFail400,
    fetchResponseSuccess204,
    uncompletedTasksState,
};

global.localStorage = new LocalStorage();

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;
