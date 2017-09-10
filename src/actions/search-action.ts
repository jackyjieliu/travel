export interface UpdateSearchTerm {
  type: 'UPDATE_SEARCH_TERM';
  payload: {
    query: string;
  };
}

export function updateSearchTerm(query: string): UpdateSearchTerm {
  return {
    type: 'UPDATE_SEARCH_TERM',
    payload: {
      query
    }
  };
}
export interface UpdateDays {
  type: 'UPDATE_DAYS';
  payload: {
    days?: number;
  };
}

export function updateDays(days?: number): UpdateDays {
  return {
    type: 'UPDATE_DAYS',
    payload: {
      days
    }
  };
}

export interface ClearSearchTerm {
  type: 'CLEAR_SEARCH_TERM';
  payload: undefined;
}

export function clearSearchTerm(): ClearSearchTerm {
  return {
    type: 'CLEAR_SEARCH_TERM',
    payload: undefined
  };
}

export interface StartSearch {
  type: 'START_SEARCH';
  payload: undefined;
}

export function startSearch(): StartSearch {
  return {
    type: 'START_SEARCH',
    payload: undefined
  };
}

export interface SearchResult {
  name: string;
  imageUrl: string;
  intro?: string;
  pointsOfInterest: Array<{
    name: string;
    imageUrl?: string;
  }>;
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

export interface UpdateSearchError {
  type: 'UPDATE_SEARCH_ERROR';
  payload: {
    message: string;
  };
}

export function updateSearchError(message: string): UpdateSearchError {
  return {
    type: 'UPDATE_SEARCH_ERROR',
    payload: {
      message
    }
  };
}

interface GoogleGeometry {
  location: {
    lat: number;
    lng: number;
  };
}

interface GooglePlace {
  name: string;
  geometry: GoogleGeometry;
  photos: Array<{ photo_reference: string; }>;
}

interface GoogleSite extends GooglePlace {
  rating: number;
}

export interface ResultDetail {
  pointsOfInterest: GoogleSite[];
  details: GooglePlace;
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

export interface LoadMoreDetails {
  type: 'LOAD_MORE_DETAILS';
  payload: {
    idx: number;
  };
}

export function loadMoreDetails(idx: number): LoadMoreDetails {
  return {
    type: 'LOAD_MORE_DETAILS',
    payload: {
      idx
    }
  };
}
