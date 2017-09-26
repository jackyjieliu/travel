
import { SearchResult, ResultDetail } from './search-action';
export type AllSearchEpicActions = UpdateSearchResultWithoutOrder | ErrorLoadingDetails | UpdateSearchResultDetail |
  UpdateSearchError | UpdateSearchResult | UpdatePlaceAround | UpdateSearchResultWithError;

export interface UpdateSearchResultWithoutOrder {
  type: 'UPDATE_SEARCH_RESULT_WITHOUT_ORDER';
  payload: {
    result: SearchResult
  };
}

export function updateSearchResultWithoutOrder(result: SearchResult): UpdateSearchResultWithoutOrder {
  return {
    type: 'UPDATE_SEARCH_RESULT_WITHOUT_ORDER',
    payload: {
      result
    }
  };
}

export interface UpdateSearchResultWithError {
  type: 'UPDATE_SEARCH_RESULT_WITH_ERROR';
  payload: {
    id: string
  };
}

export function updateSearchResultWithError(id: string): UpdateSearchResultWithError {
  return {
    type: 'UPDATE_SEARCH_RESULT_WITH_ERROR',
    payload: {
      id
    }
  };
}

export interface ErrorLoadingDetails {
  type: 'UPDATE_SEARCH_RESULT_DETAILS_ERROR';
  payload: {};
}

export function errorLoadingDetails(): ErrorLoadingDetails {
  return {
    type: 'UPDATE_SEARCH_RESULT_DETAILS_ERROR',
    payload: {}
  };
}

export interface UpdateSearchResultDetail {
  type: 'UPDATE_SEARCH_RESULT_DETAILS';
  payload: {
    details: { [key: string]: ResultDetail };
  };
}

export function updateSearchResultDetail(details: { [key: string]: ResultDetail }): UpdateSearchResultDetail {
  return {
    type: 'UPDATE_SEARCH_RESULT_DETAILS',
    payload: {
      details
    }
  };
}

export interface UpdateSearchError {
  type: 'UPDATE_SEARCH_ERROR';
  payload: {};
}

export function updateSearchError(): UpdateSearchError {
  return {
    type: 'UPDATE_SEARCH_ERROR',
    payload: {}
  };
}

export interface UpdateSearchResult {
  type: 'UPDATE_SEARCH_RESULT';
  payload: {
    results: SearchResult[];
    place: string;
  };
}

export function updateSearchResult(results: SearchResult[], place: string): UpdateSearchResult {
  return {
    type: 'UPDATE_SEARCH_RESULT',
    payload: {
      results,
      place
    }
  };
}

export interface UpdatePlaceAround {
  type: 'UPDATE_PLACE_AROUND';
  payload: {
    results: SearchResult[];
    name: string;
  };
}

export function updatePlaceAround(results: SearchResult[], name: string): UpdatePlaceAround {
  return {
    type: 'UPDATE_PLACE_AROUND',
    payload: {
      results,
      name
    }
  };
}