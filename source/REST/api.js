import { MAIN_URL, TOKEN } from "./config";
import { taskShape } from "../instruments/helpers";

export const api = {
    createTask (message) {
        return fetch(`${MAIN_URL}`, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ message }),
        });
    },
    fetchTasks () {
        return fetch(MAIN_URL, {
            method:  "GET",
            headers: {
                Authorization: TOKEN,
            },
        });
    },
    updateTask (task) {
        return fetch(MAIN_URL, {
            method:  "PUT",
            headers: {
                "content-type": "application/json",
                Authorization:  TOKEN,
            },
            body: JSON.stringify([taskShape(task)]),
        });
    },
    removeTask (taskId) {
        return fetch(`${MAIN_URL}/${taskId}`, {
            method:  "DELETE",
            headers: {
                Authorization: TOKEN,
            },
        });
    },

    completeAllTasks (tasks) {
        const completedTasks = tasks.map((task) => {
            task.completed = true;

            return api.updateTask(task);
        });

        return Promise.all(
            completedTasks.map((promise) => {
                return promise.catch((error) => {
                    return error;
                });
            })
        );
    },
};
