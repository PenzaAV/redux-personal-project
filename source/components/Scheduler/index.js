// Core
import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FlipMove from "react-flip-move";

// Instruments
import Styles from './styles.m.css';
import { filterTasksByMessage } from "../../instruments/helpers";
import { sortTasksByGroup } from "../../instruments/helpers";

// Components
import Task from '../Task';

import Checkbox from '../../theme/assets/Checkbox';
// Actions
import { tasksActions } from "../../bus/tasks/actions";

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...tasksActions }, dispatch),
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }
    _createTask = (event) => {
        const { value } = event.target[0];
        const { createTaskAsync } = this.props.actions;

        event.preventDefault();
        if (value) {
            createTaskAsync(value);
        }
    };

    render () {
        const { tasks, actions } = this.props;
        const sortedTasks = sortTasksByGroup(tasks);
        const todoList = sortedTasks.map((task) => (
            <Task
                actions = { actions }
                completed = { task.get('completed') }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                isEditState = { task.get('isEditState') }
                key = { task.get('id') }
                message = { task.get('message') }
                { ...task }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form onSubmit = { this._createTask }>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                // onKeyPress = { this._newTaskHandler }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove duration = { 400 }>{ todoList }</FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
