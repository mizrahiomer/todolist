import React, { Component, Fragment } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';
import Fade from 'react-reveal/Fade';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addTodo, deleteAllTodos } from '../../stateManager/actions/todos';
import {
  setLabelFilter,
  setStatusFilter,
  Filters,
  Labels
} from '../../stateManager/actions/filters';
import './Toolbar.css';

class Toolbar extends Component {
  state = {
    content: '',
    label: 'general'
  };
  onChangeHandler = e => this.setState({ content: e.target.value });

  onLabelChange = e => this.setState({ label: e.target.value });

  onTodoSubmit = e => {
    e.preventDefault();
    const content = this.state.content;
    const label = this.state.label;
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const date = new Date().toLocaleDateString('en-US', options);
    this.props.addTodo(content, label, date);
    this.setState({
      content: '',
      status: 'all',
      label: 'general'
    });
  };

  render() {
    return (
      <Fragment>
        <Fade top>
          <form className='form-container' onSubmit={this.onTodoSubmit}>
            <input
              className='form-item input'
              autoFocus
              type='text'
              value={this.state.content}
              onChange={this.onChangeHandler}
              placeholder='What needs to be done?'
            />
            <select
              className='form-item select'
              value={this.state.label}
              onChange={this.onLabelChange}
            >
              {Labels.map(label => (
                <option key={label.value} value={label.value}>
                  {_.capitalize(label.value)}
                </option>
              ))}
            </select>
            <Icon
              className='plus blue big form-icon'
              disabled={!this.state.content.trim() ? true : false}
              onClick={this.onTodoSubmit}
              data-tip='Add new todo'
            />
            <ReactTooltip
              place='bottom'
              effect='solid'
              afterShow={() => {
                setTimeout(ReactTooltip.hide, 9000);
              }}
            />
          </form>

          <button onClick={() => console.log(this.state)}>state</button>
          <button onClick={() => console.log(this.props.todos)}>todos</button>
          <button onClick={() => console.log(this.props.filters)}>
            filters
          </button>
          <div className='btns-group'>
            <Button
              basic={
                this.props.filters.status === Filters.SHOW_ALL ? false : true
              }
              className='tiny black'
              onClick={() => this.props.setStatusFilter(Filters.SHOW_ALL)}
            >
              All
            </Button>
            <Button
              basic={
                this.props.filters.status === Filters.SHOW_ACTIVE ? false : true
              }
              className='tiny red'
              onClick={() => this.props.setStatusFilter(Filters.SHOW_ACTIVE)}
            >
              Active
            </Button>
            <Button
              basic={
                this.props.filters.status === Filters.SHOW_COMPLETED
                  ? false
                  : true
              }
              className='tiny green'
              onClick={() => this.props.setStatusFilter(Filters.SHOW_COMPLETED)}
            >
              Completed
            </Button>
            <Icon
              className='trash big grey'
              disabled={this.props.todos.length !== 0 ? false : true}
              onClick={() => this.props.deleteAllTodos()}
              data-tip='Delete all todos'
            />
            <ReactTooltip
              place='bottom'
              type='light'
              effect='solid'
              afterShow={() => {
                setTimeout(ReactTooltip.hide, 9000);
              }}
            />
          </div>
          <div className='btns-group'>
            <Button
              basic={this.props.filters.label === 'all' ? false : true}
              onClick={() => this.props.setLabelFilter('all')}
              className='mini black'
            >
              All
            </Button>
            {Labels.map(label => (
              <Button
                key={label.value}
                toggle
                basic={this.props.filters.label === label.value ? false : true}
                onClick={() => this.props.setLabelFilter(label.value)}
                className={label.color + ' mini'}
              >
                {_.capitalize(label.value)}
              </Button>
            ))}
          </div>
        </Fade>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: state.todos,
    filters: state.filters
  };
};
const mapDisptchToProps = dispatch => {
  return {
    addTodo: (content, label, date) => dispatch(addTodo(content, label, date)),
    deleteAllTodos: () => dispatch(deleteAllTodos()),
    setStatusFilter: status => dispatch(setStatusFilter(status)),
    setLabelFilter: label => dispatch(setLabelFilter(label))
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(Toolbar);
