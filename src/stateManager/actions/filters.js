export const SET_STATUS_FILTERS = 'SET_STATUS_FILTERS';
export const SET_LABEL_FILTERS = 'SET_LABEL_FILTERS';
export const setStatusFilter = status => {
  return {
    type: SET_STATUS_FILTERS,
    status
  };
};
export const setLabelFilter = label => {
  return {
    type: SET_LABEL_FILTERS,
    label
  };
};
export const getFilteredTodos = (todos, filters) => {
  const filteredTodos =
    filters.label === 'all'
      ? todos
      : todos.filter(todo => todo.label === filters.label);
  switch (filters.status) {
    case Filters.SHOW_ALL:
      return filteredTodos;
    case Filters.SHOW_COMPLETED:
      return filteredTodos.filter(todo => todo.isComplete === true);
    case Filters.SHOW_ACTIVE:
      return filteredTodos.filter(todo => todo.isComplete === false);
    default:
      return filteredTodos;
  }
};
export const Filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};
export const Labels = [
  { value: 'general', color: 'orange' },
  { value: 'home', color: 'violet' },
  { value: 'bussines', color: 'red' },
  { value: 'personal', color: 'purple' }
];
