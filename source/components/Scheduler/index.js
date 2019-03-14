// Core
import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FlipMove from "react-flip-move";

// Instruments
import Styles from './styles.m.css';
import { filterTasksByMessage, sortTasksByGroup } from "../../instruments/helpers";

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { tasksActions } from "../../bus/tasks/actions";
import { schedulerActions } from "../../bus/scheduler/actions";

const mapStateToProps = (state) => {
    return {
        tasks:     state.tasks,
        scheduler: state.scheduler,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...tasksActions, ...schedulerActions }, dispatch),
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    componentDidUpdate () {
        const { actions, tasks } = this.props;

        actions.checkIsAllTasksCompleted(tasks);
    }

    _createTask = (event) => {
        const { value } = event.target[0];
        const { createTaskAsync } = this.props.actions;

        event.preventDefault();
        if (value) {
            createTaskAsync(value);
        }
    };

    _updateTasksFilter = (event) => {
        const { actions } = this.props;
        const { value }  = event.target;

        actions.updateTasksFilter(value);
    };

    _completeAllTasks = () => {
        const { actions, tasks } = this.props;

        actions.completeAllTasksAsync(tasks);
    };

    render () {
        const { scheduler, tasks, actions } = this.props;
        const isChecked = scheduler.get('allTasksCompleted');
        const tasksFilter = scheduler.get('tasksFilter');
        const sortedTasks = sortTasksByGroup(tasks);
        const filteredTasks = filterTasksByMessage(sortedTasks, tasksFilter);
        const todoList = filteredTasks.map((task) => {

            return (
                <Task
                    actions = { actions }
                    completed = { task.get('completed') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    isEditState = { task.get('isEditState') || false }
                    key = { task.get('id') }
                    message = { task.get('message') }
                    newMessage = { task.get('newMessage') || '' }
                    { ...task }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск' type = 'search'
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTask }>
                            <input
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div>
                            <ul>
                                <FlipMove duration = { 400 }>{ todoList }</FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { isChecked }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasks }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
