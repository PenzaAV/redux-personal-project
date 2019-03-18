// Core
import React, { PureComponent } from "react";
import cx from "classnames";

// Instruments
import Styles from "./styles.m.css";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Remove from "../../theme/assets/Remove";
import Edit from "../../theme/assets/Edit";
import Star from "../../theme/assets/Star";

export default class Task extends PureComponent {
    componentDidUpdate () {
        const { isEditState } = this.props;

        if (isEditState) {
            this.taskInput.current.focus();
        }
    }

    taskInput = React.createRef();

    _removeTask = () => {
        const { id, actions } = this.props;

        actions.removeTaskAsync(id);
    };

    _toggleComplete = () => {
        const { completed, actions } = this.props;

        if (completed) {
            actions.unsetCompleteTaskAsync({ ...this.props });
        } else {
            actions.setCompleteTaskAsync({ ...this.props });
        }
    };

    _toggleFavorite = () => {
        const { favorite, actions } = this.props;

        if (favorite) {
            actions.unsetFavoriteTaskAsync({ ...this.props });
        } else {
            actions.setFavoriteTaskAsync({ ...this.props });
        }
    };

    _updateNewMessage = (event) => {
        const { actions } = this.props;

        actions.setTaskNewMessage(this.props.id, event.target.value);
    };

    _editStateHandler = () => {
        const { actions, isEditState, id, message } = this.props;

        actions.disableEditState();
        actions.clearTaskNewMessage();

        if (!isEditState) {
            actions.setTaskNewMessage(id, message);
            actions.enableEditState(this.props);
        }
    };
    _keyDownHandler = () => {
        const { actions, newMessage } = this.props;

        if (event.key === "Escape") {
            actions.disableEditState();
            actions.clearTaskNewMessage();
        }
        if (event.key === "Enter" && newMessage !== "") {
            actions.updateTaskMessageAsync({
                ...this.props,
                message: newMessage,
            });
        }
    };
    render () {
        const {
            newMessage,
            message,
            completed,
            favorite,
            isEditState,
        } = this.props;
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
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { isEditState ? newMessage : message }
                        onChange = { this._updateNewMessage }
                        onKeyDown = { this._keyDownHandler }
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
                        checked = { isEditState }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._editStateHandler }
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
