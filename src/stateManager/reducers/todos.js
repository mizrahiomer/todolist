import * as actionTypes from '../actions/todos';

const todosReducer = (
  state = [
    { id: 1, content: '22', label: 'general', date: 1, lastModifiedDate: 1 }
  ],
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          id: action.date + action.content + action.label + state.length,
          content: action.content,
          label: action.label,
          date: action.date,
          lastModifiedDate: '',
          isComplete: false,
          isEditing: false
        }
      ];
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

    default:
      return state;
  }
};
export default todosReducer;
