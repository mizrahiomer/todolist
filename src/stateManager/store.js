import { createStore } from 'redux';
import allReducers from './reducers';

export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  return JSON.parse(serializedState);
};

export const saveState = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('state', serializedState);
};
const presistedStore = loadState();
const store = createStore(
  allReducers,
  presistedStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

export default store;
