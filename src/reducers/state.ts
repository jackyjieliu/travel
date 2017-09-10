import search, { SearchState } from './search-reducer';
import searchResults, { SearchResultsState } from './search-results-reducer';

export interface State {
  search: SearchState;
  searchResults: SearchResultsState;
}

export const reducers = {
  search,
  searchResults
};
