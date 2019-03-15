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
import { List, Map } from "immutable";
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
        completed: false,
        favorite:  false,
        created:   "2019-03-15T11:08:49.411Z",
    }
];
const tasksState = List([
    Map(
        {
            id:        'test_task_id',
            message:   "test_task_message",
            completed: false,
            favorite:  false,
            created:   "2019-03-15T11:08:49.411Z",
        }
    ),
    Map(
        {
            id:        'test_task_2_id',
            message:   "test_task_2_message",
            completed: false,
            favorite:  false,
            created:   "2019-03-15T11:08:49.411Z",
        }
    )
]);
const task = {
    id:        'test_task_id',
    message:   "test_task_message",
    completed: false,
    favorite:  false,
    created:   "2019-03-15T11:08:49.411Z",
};
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

const fetchResponseFail401 = {
    status: 401,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

const promiseAllResponseError = [
    {
        status: 400,
    }
];
const error = new Error(errorMessage);
global.__ = {
    message,
    tasks,
    task,
    taskId,
    tasksState,
    fetchResponseSuccess,
    promiseAllResponseError,
    error,
    fetchResponseFail400,
};

global.localStorage = new LocalStorage();

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;
