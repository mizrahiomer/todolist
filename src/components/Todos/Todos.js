import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { getFilteredTodos } from '../../stateManager/actions/filters';
import Todo from '../Todo/Todo';
import './Todos.css';
import { Alert } from 'react-bootstrap';

const Todos = props => {
  return (
    <Container>
      {props.todos.length !== 0 ? (
        props.todos.map((task, i) => (
          <Todo
            key={task.id}
            id={task.id}
            label={task.label}
            index={i}
            content={task.content}
            date={task.date}
            isEditing={task.isEditing}
            isComplete={task.isComplete}
            lastModifiedDate={task.lastModifiedDate}
          />
        ))
      ) : (
        <Alert className='text-center col-sm-2' variant='warning'>
          No todos to display
        </Alert>
      )}
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    todos: getFilteredTodos(state.todos, state.filters)
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
