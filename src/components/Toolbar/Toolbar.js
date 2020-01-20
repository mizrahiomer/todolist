import React, { Component, Fragment } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
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
    label: 'general',
    showModal: false
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
          <div className='btns-group'>
            <Button
              active={
                this.props.filters.status === Filters.SHOW_ALL ? true : false
              }
              inverted
              className='tiny blue'
              onClick={() => this.props.setStatusFilter(Filters.SHOW_ALL)}
            >
              All
            </Button>
            <Button
              inverted
              className='tiny red'
              onClick={() => this.props.setStatusFilter(Filters.SHOW_ACTIVE)}
            >
              Active
            </Button>
            <Button
              inverted
              className='tiny green'
              onClick={() => this.props.setStatusFilter(Filters.SHOW_COMPLETED)}
            >
              Completed
            </Button>
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
              inverted
              active={this.props.filters.label === 'all' ? true : false}
              onClick={() => this.props.setLabelFilter('all')}
              className='mini blue'
            >
              All
            </Button>
            {Labels.map(label => (
              <Button
                key={label.value}
                inverted
                onClick={() => this.props.setLabelFilter(label.value)}
                className={label.color + ' mini'}
              >
                {_.capitalize(label.value)}
              </Button>
            ))}
            <Icon
              className='trash big grey'
              disabled={this.props.todos.length !== 0 ? false : true}
              onClick={() => this.setState({ showModal: true })}
              data-tip='Delete all todos'
            />
            <Modal
              show={this.state.showModal}
              centered
              keyboard
              onHide={() => this.setState({ showModal: false })}
            >
              <Modal.Header>
                <Modal.Title>
                  Are you sure you want to delete all todos ?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>You will not be able to recover it</Modal.Body>
              <Modal.Footer>
                <Button
                  className='red'
                  inverted
                  onClick={() => this.setState({ showModal: false })}
                >
                  No, Keep them
                </Button>
                <Button
                  className='green'
                  inverted
                  onClick={() => {
                    this.props.deleteAllTodos();
                    this.setState({ showModal: false });
                  }}
                >
                  Yes, Delete All
                </Button>
              </Modal.Footer>
            </Modal>
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
