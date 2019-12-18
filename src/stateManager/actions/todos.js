export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const EDIT_TODO_SUBMIT = 'EDIT_TODO_SUBMIT';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const addTodo = (content, label, date) => {
  return {
    type: ADD_TODO,
    content,
    label,
    date
  };
};
export const editTodo = id => {
  return {
    type: EDIT_TODO,
    id
  };
};
export const editTodoSubmit = (id, content, label, date) => {
  return {
    type: EDIT_TODO_SUBMIT,
    id,
    content,
    label,
    date
  };
};
export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};
export const completeTodo = id => {
  return {
    type: COMPLETE_TODO,
    id
  };
};
export const deleteAllTodos = () => {
  return {
    type: DELETE_ALL_TODOS
  };
};
