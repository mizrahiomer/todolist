import * as actionTypes from '../actions/filters';
import { Filters } from '../actions/filters';

const initialState = {
  status: Filters.SHOW_ALL,
  label: 'all'
};
const visibilityFiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STATUS_FILTERS:
      return { ...state, status: action.status };
    case actionTypes.SET_LABEL_FILTERS:
      return { ...state, label: action.label };
    default:
      return state;
  }
};
export default visibilityFiltersReducer;
