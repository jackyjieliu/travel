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
  };
}

export function updateSearchResult(results: SearchResult[]): UpdateSearchResult {
  return {
    type: 'UPDATE_SEARCH_RESULT',
    payload: {
      results
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
