import React, { Component } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { getFilteredTodos } from '../../stateManager/actions/filters';
import { reorderTodos } from '../../stateManager/actions/todos';
import Todo from '../Todo/Todo';
import './Todos.css';

class Todos extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      (destination.droppableId === source.droppableId) &
      (destination.index === source.index)
    ) {
      return;
    }
    this.props.reorderTodos(source.index, destination.index, draggableId);
  };
  render() {
    return (
      <DragDropContext className='cont' onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <div
              className='todos-container'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.todos.length !== 0 ? (
                this.props.todos.map((task, i) => (
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
                <div className='message'>No todos to display</div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: getFilteredTodos(state.todos, state.filters)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reorderTodos: (sourceIndex, destIndex, draggableId) =>
      dispatch(reorderTodos(sourceIndex, destIndex, draggableId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
