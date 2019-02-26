import { MAIN_URL, TOKEN } from "./config";

export const api = {
    createTask (message) {
        return fetch(`${MAIN_URL}`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
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
            body: JSON.stringify([
                {
                    id:        task.id,
                    message:   task.message,
                    completed: task.completed,
                    favorite:  task.favorite,
                }
            ]),
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
        const completedTasks = tasks.map(async (task) => {
            task.completed = true;
            await api.updateTask(task);
        });

        return Promise.all(completedTasks);
    },
};
