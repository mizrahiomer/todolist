import * as actionTypes from '../actions/todos';
const todosReducer = (state = [], action) => {
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
      return [...state, newTodo];
    case actionTypes.DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case actionTypes.DELETE_ALL_TODOS:
      return [];
    case actionTypes.EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
    case actionTypes.COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, isComplete: !todo.isComplete } : todo
      );
    case actionTypes.EDIT_TODO_SUBMIT:
      return state.map(todo =>
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
    case actionTypes.REORDER_TODOS:
      const draggedTodo = state.find(todo => todo.id === action.draggableId);
      state.splice(action.sourceIndex, 1);
      state.splice(action.destIndex, 0, draggedTodo);
      return state;

    default:
      return state;
  }
};
export default todosReducer;
