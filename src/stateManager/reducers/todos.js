import * as actionTypes from '../actions/todos';
const initialState = JSON.parse(localStorage.getItem('todos')) || [];
const todosReducer = (state = initialState, action) => {
  let modifiedTodos = [];
  switch (action.type) {
    case actionTypes.ADD_TODO:
      const newTodo = {
        id: action.date + action.content + action.label + state.length,
        content: action.content,
        label: action.label,
        date: action.date,
        lastModifiedDate: '',
        isComplete: false,
        isEditing: false
      };
      localStorage.setItem('todos', JSON.stringify([...state, newTodo]));
      return [...state, newTodo];
    case actionTypes.DELETE_TODO:
      modifiedTodos = state.filter(todo => todo.id !== action.id);
      localStorage.setItem('todos', JSON.stringify(modifiedTodos));
      return modifiedTodos;
    case actionTypes.DELETE_ALL_TODOS:
      localStorage.removeItem('todos');
      return [];
    case actionTypes.EDIT_TODO:
      modifiedTodos = state.map(todo =>
        todo.id === action.id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
      localStorage.setItem('todos', JSON.stringify(modifiedTodos));
      return modifiedTodos;
    case actionTypes.COMPLETE_TODO:
      modifiedTodos = state.map(todo =>
        todo.id === action.id ? { ...todo, isComplete: !todo.isComplete } : todo
      );
      localStorage.setItem('todos', JSON.stringify(modifiedTodos));
      return modifiedTodos;
    case actionTypes.EDIT_TODO_SUBMIT:
      modifiedTodos = state.map(todo =>
        todo.id === action.id
          ? {
              ...todo,
              content: action.content,
              label: action.label,
              lastModifiedDate: action.date,
              isEditing: false
            }
          : todo
      );
      localStorage.setItem('todos', JSON.stringify(modifiedTodos));
      return modifiedTodos;
    case actionTypes.REORDER_TODOS:
      const draggedTodo = state.find(todo => todo.id === action.draggableId);
      state.splice(action.sourceIndex, 1);
      state.splice(action.destIndex, 0, draggedTodo);
      localStorage.setItem('todos', JSON.stringify(state));
      return state;

    default:
      return state;
  }
};
export default todosReducer;
