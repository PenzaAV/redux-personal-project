// Core
import React, { Component } from 'react';
import { connect } from "react-redux";

// Instruments
import Styles from './styles.m.css';

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';

// Actions
import { tasksActions } from "../../bus/tasks/actions";
import { bindActionCreators } from "redux";

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
        const { fetchTasksAsync } = this.props.actions;

        fetchTasksAsync();
    }
    _createTask = (event) => {
        const { value } = event.target[0];
        const { createTaskAsync } = this.props.actions;

        event.preventDefault();
        if (value) {
            createTaskAsync(value);
        }
    };

    _updateTaskAsync = (task, meta) => {
        const { updateTaskAsync } = this.props.actions;

        updateTaskAsync({
            id:        task.id,
            message:   task.message,
            completed: task.completed,
            favorite:  task.favorite,
        }, meta);
    };
    _enableEditState = (taskId) => {
        const { enableEditState } = this.props.actions;

        enableEditState(taskId);
    };

    render () {
        const { tasks, actions } = this.props;

        const todoList = tasks.map((task) => (
            <Task
                completed = { task.get('completed') }
                favorite = { task.get('favorite') }
                id = { task.get('id') }
                isEditState = { task.get('isEditState') }
                key = { task.get('id') }
                message = { task.get('message') }
                { ...task }
                { ...actions }
                _enableEditState = { this._enableEditState }
                _updateTaskAsync = { this._updateTaskAsync }
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
                            <ul>{todoList}</ul>
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
