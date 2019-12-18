import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reveal from 'react-reveal/Reveal';
import { Icon, Segment, Label } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';
import Fade from 'react-reveal/Fade';
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
    const lastModifiedDate =
      this.props.lastModifiedDate !== ''
        ? 'Last modified date: ' + this.props.lastModifiedDate
        : '';

    return (
      <Fade bootom>
        <Segment tertiary className='col-sm-7 yellow ' inverted padded>
          <Label ribbon color={this.getLabelColor(this.props.label)}>
            {_.capitalize(this.props.label)}
          </Label>

          {this.props.isEditing ? (
            <Reveal>
              <form
                className='form-inline mt-4'
                onSubmit={this.OnSubmitHandler}
              >
                <input
                  className='form-control'
                  required
                  autoFocus
                  type='text'
                  value={this.state.editContent}
                  onChange={this.onContentEditHandler}
                ></input>
                <select
                  className='form-control'
                  value={this.state.editLabel}
                  onChange={this.onLabelEditHandler}
                >
                  {Labels.map(label => (
                    <option key={label.value} value={label.value}>
                      {label.displayedValue}
                    </option>
                  ))}
                </select>
                <Icon
                  className='check big green mx-2'
                  onClick={this.OnSubmitHandler}
                />
              </form>
            </Reveal>
          ) : (
            <div className='mt-4'>
              <Icon
                className={completeBtn}
                onClick={() => this.props.completeTodo(this.props.id)}
              ></Icon>
              <div
                className='d-inline'
                onClick={() => this.props.editTodo(this.props.id)}
                data-tip='Click to edit'
              >
                {this.props.content}
              </div>
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

          <div className='text-muted'>
            <p className='mt-3 mb-0'>Create date: {this.props.date}</p>
            <p className='m-0'>{lastModifiedDate}</p>
          </div>
          <div className=' text-right'>
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
          </div>
        </Segment>
      </Fade>
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
