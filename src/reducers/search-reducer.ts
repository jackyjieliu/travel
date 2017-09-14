
import { AllSearchActions } from '../actions/search-action';
import 'rxjs';

export interface SearchState {
  query: string;
  days?: number;
}

const INITIAL_STATE: SearchState = {
  query: '',
  days: undefined,
};

export default function searchReducer(state: SearchState = INITIAL_STATE, action: AllSearchActions): SearchState {
  let newState = state;
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      newState = {
        ...state,
        query: action.payload.query
      };
      break;
    case 'CLEAR_SEARCH_TERM':
      newState = {
        ...state,
        query: ''
      };
      break;
    case 'UPDATE_DAYS':
      newState = {
        ...state,
        days: action.payload.days
      };
      break;
    default:
  }
  return newState;
}
