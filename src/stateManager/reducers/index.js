import { combineReducers } from 'redux';
import todos from './todos';
import filters from './filters';
const allReducers = combineReducers({
  todos,
  filters
});

export default allReducers;
