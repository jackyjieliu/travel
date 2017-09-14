
import { AllSearchActions, SearchResult, ResultDetail } from '../actions/search-action';

export interface SearchResultsState {
  searching: boolean;
  loadingDetails: boolean;
  errorLoadingResults: boolean;
  errorLoadingDetails: boolean;

  // This is what the server things the user searched.
  // May be different from the user input
  travelingFrom: string;
  resultDetail: { [key: string]: ResultDetail };
  results: SearchResult[];
}

const INITIAL_STATE: SearchResultsState = {
  searching: false,
  results: [],
  resultDetail: {},
  travelingFrom: '',
  errorLoadingResults: false,
  errorLoadingDetails: false,
  loadingDetails: false
};

export default function searchResultsReducer(
    state: SearchResultsState = INITIAL_STATE,
    action: AllSearchActions
  ): SearchResultsState {

  let newState = state;
  switch (action.type) {
    case 'START_SEARCH':
      newState = {
        ...state,
        searching: true,
      };
      break;
    case 'UPDATE_SEARCH_RESULT':
      newState = {
        ...state,
        searching: false,
        results: action.payload.results,
        travelingFrom: action.payload.place,
        errorLoadingResults: false
      };
      break;
    case 'UPDATE_SEARCH_ERROR':
      newState = {
        ...state,
        searching: false,
        results: [],
        travelingFrom: '',
        errorLoadingResults: true
      };
      break;
    case 'UPDATE_SEARCH_RESULT_DETAILS':
      newState = {
        ...state,
        loadingDetails: false,
        errorLoadingDetails: false,
        resultDetail: {
          ...state.resultDetail,
          ...action.payload.details
        }
      };
      break;
    case 'UPDATE_SEARCH_RESULT_DETAILS_ERROR':
      newState = {
        ...state,
        loadingDetails: false,
        errorLoadingDetails: true
      };
      break;
    case 'LOAD_MORE_DETAILS':
      newState = {
        ...state,
        loadingDetails: true
      };
      break;
    default:
  }
  return newState;
}
