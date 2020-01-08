import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reveal from 'react-reveal/Reveal';
import { Icon, Label } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import {
  editTodo,
  editTodoSubmit,
  completeTodo,
  deleteTodo,
  addTodo
} from '../../stateManager/actions/todos';
import { Labels } from '../../stateManager/actions/filters';
import './Todo.css';
import { Draggable } from 'react-beautiful-dnd';

class Todo extends Component {
  state = {
    editContent: this.props.content,
    editLabel: this.props.label
  };
  onContentEditHandler = e => this.setState({ editContent: e.target.value });
  onLabelEditHandler = e => this.setState({ editLabel: e.target.value });
  OnSubmitHandler = e => {
    e.preventDefault();
    const id = this.props.id;
    const newContent = this.state.editContent;
    const newLabel = this.state.editLabel;
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const newDate = new Date().toLocaleDateString('en-US', options);
    this.props.editTodoSubmit(id, newContent, newLabel, newDate);
  };
  onDuplicateHandler = e => {
    e.preventDefault();
    const content = this.props.content;
    const label = this.props.label;
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const date = new Date().toLocaleDateString('en-US', options);
    this.props.duplicateTodo(content, label, date);
  };
  getLabelColor = myLabel => {
    const index = Labels.findIndex(label => label.value === myLabel);
    const color = Labels[index].color;
    console.log(color);
    return color;
  };

  render() {
    const completeBtn = this.props.isComplete
      ? 'check circle green big'
      : 'check circle outline big ';
    const completeContent = this.props.isComplete ? 'completed ' : '';
    const lastModifiedDate =
      this.props.lastModifiedDate !== ''
        ? 'Last modified date: ' + this.props.lastModifiedDate
        : '';

    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided => (
          <div
            className='todo'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Label ribbon color={this.getLabelColor(this.props.label)}>
              {_.capitalize(this.props.label)}
            </Label>
            {this.props.isEditing ? (
              <Reveal>
                <form
                  className='form-container'
                  onSubmit={this.OnSubmitHandler}
                >
                  <input
                    className='form-item'
                    autoFocus
                    type='text'
                    value={this.state.editContent}
                    onChange={this.onContentEditHandler}
                  ></input>
                  <select
                    className='form-item'
                    value={this.state.editLabel}
                    onChange={this.onLabelEditHandler}
                  >
                    {Labels.map(label => (
                      <option key={label.value} value={label.value}>
                        {_.capitalize(label.value)}
                      </option>
                    ))}
                  </select>
                  <Icon
                    className='check big green form-icon'
                    disabled={!this.state.editContent.trim() ? true : false}
                    onClick={this.OnSubmitHandler}
                  />
                </form>
              </Reveal>
            ) : (
              <div className='details'>
                <span
                  className={completeContent + 'content'}
                  onClick={() => this.props.editTodo(this.props.id)}
                  data-tip='Click to edit'
                >
                  {this.props.content}
                </span>
                <ReactTooltip
                  place='bottom'
                  type='light'
                  effect='solid'
                  afterShow={() => {
                    setTimeout(ReactTooltip.hide, 8000);
                  }}
                />
              </div>
            )}
            <div className='dates'>
              <p>Create date: {this.props.date}</p>
              <p>{lastModifiedDate}</p>
            </div>
            <div className='btns'>
              <Icon
                className='x big red'
                data-tip='Delete todo'
                onClick={() => this.props.deleteTodo(this.props.id)}
              />
              <ReactTooltip
                place='bottom'
                type='light'
                effect='solid'
                afterShow={() => {
                  setTimeout(ReactTooltip.hide, 8000);
                }}
              />
              <Icon
                className='copy big teal'
                data-tip='Duplicate todo'
                onClick={this.onDuplicateHandler}
              />
              <ReactTooltip
                place='bottom'
                type='light'
                effect='solid'
                afterShow={() => {
                  setTimeout(ReactTooltip.hide, 8000);
                }}
              />
              <Icon
                className={completeBtn}
                data-tip={
                  !this.props.isComplete ? 'Complete todo' : 'Uncomplete todo'
                }
                onClick={() => this.props.completeTodo(this.props.id)}
              ></Icon>
              <ReactTooltip
                place='bottom'
                type='light'
                effect='solid'
                afterShow={() => {
                  setTimeout(ReactTooltip.hide, 8000);
                }}
              />
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: id => dispatch(deleteTodo(id)),
    editTodo: id => dispatch(editTodo(id)),
    completeTodo: id => dispatch(completeTodo(id)),
    editTodoSubmit: (id, content, label, date) =>
      dispatch(editTodoSubmit(id, content, label, date)),
    duplicateTodo: (content, label, date) =>
      dispatch(addTodo(content, label, date))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
