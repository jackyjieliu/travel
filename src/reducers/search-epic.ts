
import { AllSearchActions,  ResultDetail, updateSearchResultDetail, LoadMoreDetails,
  loadMoreDetails, updateSearchResult, updateSearchError, errorLoadingDetails } from '../actions/search-action';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';
import { State } from './state';
import * as _ from 'lodash';

import 'rxjs';

const searchEpic: Epic<AllSearchActions, State> = (action$, store) =>
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
          return Observable.of({ locations: [], place: '', error: true });
        })
    )
    .map((results: { locations: Array<any>; place: string; error?: boolean; }) => {
      if (results.error) {
        return updateSearchError();
      }
      return updateSearchResult(results.locations, results.place);
    });

const initialSearchDetailEpic: Epic<AllSearchActions, State> = (action$, store) =>
  action$
    .ofType('UPDATE_SEARCH_RESULT')
    .map(() => {
      return loadMoreDetails(0);
    });

const loadMoreSearchDetails: Epic<AllSearchActions, State> = (action$, store) =>
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
          return Observable.of({ locations: [], error: true });
        })
    )
    .map((results: { locations: Array<ResultDetail & { name: string }>, error?: boolean; }) => {
      if (results.error) {
        return errorLoadingDetails();
      }
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
