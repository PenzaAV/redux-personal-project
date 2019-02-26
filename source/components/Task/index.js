// Core
import React, { PureComponent } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends PureComponent {
    componentDidUpdate () {
        const { isEditState } = this.props;

        if (isEditState) {
            this.taskInput.current.focus();
        }
    }

    taskInput = React.createRef();

    _removeTask = () => {
        const { id, removeTaskAsync } = this.props;

        removeTaskAsync(id);
    };
    _toggleComplete = () => {
        const { _updateTaskAsync } = this.props;

        _updateTaskAsync({
            ...this.props,
            completed: !this.props.completed,
        }, 'toggle completed state');
    };
    _toggleFavorite = () => {
        const { _updateTaskAsync } = this.props;

        _updateTaskAsync({
            ...this.props,
            favorite: !this.props.favorite,
        }, 'toggle favorite state');
    };
    _enableEditState = () => {
        const { _enableEditState, id } = this.props;

        _enableEditState(id);
    };

    render () {
        const { message, completed, favorite, isEditState } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleComplete }
                    />
                    <input
                        disabled = { !isEditState }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { message }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleFavorite }
                    />
                    <Edit
                        inlineBlock
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._enableEditState }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
