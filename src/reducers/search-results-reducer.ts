
import { AllSearchActions, SearchResult, ResultDetail } from '../actions/search-action';
import { AllSearchEpicActions } from '../actions/search-epic-action';
import * as _ from 'lodash';

type AllPossibleEpicAcations = AllSearchEpicActions | AllSearchActions;

export interface SearchResultsState {
  searching: boolean;
  loadingDetails: boolean;
  errorLoadingResults: boolean;
  errorLoadingDetails: boolean;
  travelingFrom: string;

  // This is what the server things the user searched.
  // May be different from the user input
  resultDetail: { [key: string]: ResultDetail };
  results: { [key: string]: SearchResult | false };
  placeAround: { [key: string]: SearchResult[] };
  // names
  resultsOrder: string[];
}

const INITIAL_STATE: SearchResultsState = {
  // TODO: Refactor the ui portion into another readucer. this one should only have data.
  // Even result order should be moved.

  // TODO: Maybe the initial searching can be implied? No data + no error? That mean
  // clicking search button should clear resultsOrder.
  searching: false,
  results: {},
  resultsOrder: [],
  resultDetail: {},
  placeAround: {},
  travelingFrom: '',
  errorLoadingResults: false,
  errorLoadingDetails: false,
  loadingDetails: false
};

function mapSearchResultsFromArray(results: SearchResult[]) {
  const mappedResults = {};
  _.each(results, (result) => {
    mappedResults[result.id] = result;
  });
  return mappedResults;
}

export default function searchResultsReducer(
    state: SearchResultsState = INITIAL_STATE,
    action: AllPossibleEpicAcations
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
      const newResultsOrder = _.map(action.payload.results, (result) => {
        return result.id;
      });

      newState = {
        ...state,
        searching: false,
        results: {
          ...state.results,
          ...mapSearchResultsFromArray(action.payload.results)
        },
        resultsOrder: newResultsOrder,
        travelingFrom: action.payload.place,
        errorLoadingResults: false
      };
      break;
    case 'UPDATE_SEARCH_ERROR':
      newState = {
        ...state,
        searching: false,
        resultsOrder: [],
        travelingFrom: '',
        errorLoadingResults: true
      };
      break;
    case 'UPDATE_SEARCH_RESULT_WITHOUT_ORDER':
      newState = {
        ...state,
        results: {
          ...state.results,
          ...mapSearchResultsFromArray([action.payload.result])
        }
      };
      break;
    case 'FETCH_PLACE_WITH_ID':
      newState = {
        ...state,
        results: _.omitBy(state.results, (val, key) => {
          return key !== action.payload.id;
        }) as any
      };
      break;
    case 'UPDATE_SEARCH_RESULT_WITH_ERROR':
      newState = {
        ...state,
        results: {
          ...state.results,
          [action.payload.id]: false
        }
      };
      break;
    case 'UPDATE_PLACE_AROUND':
      newState = {
        ...state,
        placeAround: {
          ...state.placeAround,
          [action.payload.name]: action.payload.results
        }
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
