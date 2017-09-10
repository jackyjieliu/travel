
import { StartSearch, UpdateSearchResultDetail, ResultDetail, updateSearchResultDetail, LoadMoreDetails,
  loadMoreDetails, UpdateSearchResult, updateSearchResult, UpdateSearchError, updateSearchError
  } from '../actions/search-action';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';
import { State } from './state';
import * as _ from 'lodash';

import 'rxjs';

type EpicActions = StartSearch | UpdateSearchResult | UpdateSearchError | UpdateSearchResultDetail | LoadMoreDetails;

const searchEpic: Epic<EpicActions, State> = (action$, store) =>
  action$
    .ofType('START_SEARCH')
    .map((action) => {
      const state = store.getState();
      const query = state.search.query;
      const days = state.search.days;
      console.log('query: ' + query + ', days: ' + days);
      return {query, days};
    })
    .switchMap((params) =>
      Observable.ajax.getJSON('/api/places?' + queryString.stringify(params))
        .catch((err) => {
          return Observable.of({ locations: [], place: '' });
        })
    )
    .map((results: { locations: Array<any>; place: string; }) => {
      return updateSearchResult(results.locations, results.place);
    })
    .catch(() => {
      return Observable.of(updateSearchError('Something went wrong'));
    });

const initialSearchDetailEpic: Epic<EpicActions, State> = (action$, store) =>
  action$
    .ofType('UPDATE_SEARCH_RESULT')
    .map(() => {
      return loadMoreDetails(0);
    });

const loadMoreSearchDetails: Epic<LoadMoreDetails | UpdateSearchResultDetail, State> = (action$, store) =>
  action$
    .ofType('LOAD_MORE_DETAILS')
    .map((action: LoadMoreDetails) => {
      const idx = action.payload.idx;
      const state = store.getState();
      const results = state.searchResults.results;
      const firstThreeResults = results.slice(idx, idx + 3);
      const details = state.searchResults.resultDetail;

      const missingDetails = _.filter(firstThreeResults, (result) => {
        return !details[result.name];
      });
      console.log('missingDetails', { missingDetails });
      return _.map(missingDetails, 'name');
    })
    .filter((missingDetails) => {
      return missingDetails && missingDetails.length > 0;
    })
    .switchMap((missingDetails) =>
      Observable.ajax.getJSON('/api/places/details?' + queryString.stringify({ places: missingDetails }))
        .catch((err) => {
          return Observable.of({ locations: [] });
        })
    )
    .map((results: { locations: Array<ResultDetail & { name: string }> }) => {
      const obj = {};
      _.each(results.locations, (location) => {
        const name = location.name;
        obj[name] = {
          pointsOfInterest: location.pointsOfInterest,
          details: location.details
        };
      });
      return updateSearchResultDetail(obj);
    });

export const searchEpics = combineEpics(searchEpic, initialSearchDetailEpic, loadMoreSearchDetails);