// Core
import moment from "moment";

export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export const taskShape = (task) => ({
    id:        task.id,
    completed: task.completed,
    favorite:  task.favorite,
    message:   task.message,
});

export const sortTasksByDate = (tasks) => {
    return tasks.sort((task1, task2) => {
        if (
            moment(task2.get("created")).unix() >
            moment(task1.get("created")).unix()
        ) {
            return 1;
        } else if (
            moment(task1.get("created")).unix() >
            moment(task2.get("created")).unix()
        ) {
            return -1;
        }

        return 0;
    });
};

export const sortTasksByGroup = (tasks) => {
    const favorite = tasks.filter((task) => {
        return task.get("favorite") && !task.get("completed");
    });

    const usual = tasks.filter(
        (task) => !task.get("favorite") && !task.get("completed")
    );
    const completed = sortTasksByDate(
        tasks.filter((task) => task.get("completed"))
    );

    const sortedCompleted = [
        ...completed.sort((task1, task2) => {
            if (task1.get("favorite") && !task2.get("favorite")) {
                return -1;
            } else if (!task1.get("favorite") && task2.get("favorite")) {
                return 1;
            }

            return 0;
        })
    ];

    return [
        ...sortTasksByDate(favorite),
        ...sortTasksByDate(usual),
        ...sortedCompleted
    ];
};

export const filterTasksByMessage = (tasks, tasksFilter) => {
    if (tasksFilter) {
        return tasks.filter(
            (task) => task.get("message").indexOf(tasksFilter) !== -1
        );
    }

    return tasks;
};

export const getUncompleted = (tasks) => {
    return tasks.filter((task) => {
        return task.get("completed") === false;
    });
};
