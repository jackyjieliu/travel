
import { StartSearch, SearchResult, ResultDetail, UpdateSearchResultDetail, LoadMoreDetails,
  UpdateSearchResult, UpdateSearchError } from '../actions/search-action';

export interface SearchResultsState {
  searching: boolean;
  loadingDetails: boolean;
  errorMessage: string;

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
  errorMessage: '',
  loadingDetails: false
};

type SearchAction = StartSearch | UpdateSearchResult | UpdateSearchError | UpdateSearchResultDetail | LoadMoreDetails;

export default function searchResultsReducer(
    state: SearchResultsState = INITIAL_STATE,
    action: SearchAction
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
        errorMessage: ''
      };
      break;
    case 'UPDATE_SEARCH_ERROR':
      newState = {
        ...state,
        searching: false,
        results: [],
        travelingFrom: '',
        errorMessage: action.payload.message
      };
      break;
    case 'UPDATE_SEARCH_RESULT_DETAILS':
      newState = {
        ...state,
        loadingDetails: false,
        resultDetail: {
          ...state.resultDetail,
          ...action.payload.details
        }
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
