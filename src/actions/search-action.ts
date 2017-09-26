export type AllSearchActions = UpdateSearchTerm | UpdateDays | ClearSearchTerm | StartSearch |
  LoadMoreDetails | FetchPlaceWithId;

export interface ResultPhotos {
  photos: string[];
}

export interface GoogleGeometry {
  location: {
    lat: number;
    lng: number;
  };
}

export interface GooglePlace {
  geometry: GoogleGeometry;
  photos: Array<{ photo_reference: string; }>;
}

export interface GoogleSite extends GooglePlace {
  rating: number;
  name: string;
}

export interface ResultDetail extends ResultPhotos {
  name: string;
  pointsOfInterest: GoogleSite[];
  details: GooglePlace;
}

export interface SearchResult {
  id: string;
  name: string;
}

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

export interface FetchPlaceWithId {
  type: 'FETCH_PLACE_WITH_ID';
  payload: {
    id: string;
  };
}

export function fetchPlaceWithId(id: string): FetchPlaceWithId {
  return {
    type: 'FETCH_PLACE_WITH_ID',
    payload: {
      id
    }
  };
}
