
import { AllSearchActions,  ResultDetail, LoadMoreDetails, SearchResult,
  FetchPlaceWithId } from '../actions/search-action';

import { AllSearchEpicActions, updateSearchResult, updateSearchError, errorLoadingDetails,
  updateSearchResultWithoutOrder, updateSearchResultDetail, UpdateSearchResultWithoutOrder,
  UpdateSearchResult, updatePlaceAround, UpdateSearchResultDetail, updateSearchResultWithError
 } from '../actions/search-epic-action';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';
import { State } from './state';
import * as _ from 'lodash';

import 'rxjs';

type AllPossibleEpicAcations = AllSearchEpicActions | AllSearchActions;

const searchEpic: Epic<AllPossibleEpicAcations, State> = (action$, store) =>
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

const loadMoreSearchDetails: Epic<AllPossibleEpicAcations, State> = (action$, store) =>
  action$
    .ofType('LOAD_MORE_DETAILS', 'UPDATE_SEARCH_RESULT_WITHOUT_ORDER', 'UPDATE_SEARCH_RESULT')
    .map((action: LoadMoreDetails | UpdateSearchResultWithoutOrder | UpdateSearchResult) => {
      let missingDetails;
      let potentialResults: SearchResult[];
      const state = store.getState();
      const resultsOrder = state.searchResults.resultsOrder;
      const results = state.searchResults.results;
      const details = state.searchResults.resultDetail;
      const NUMBER_OF_DETAILS_TO_FETCH = 3;

      if (action.type === 'UPDATE_SEARCH_RESULT_WITHOUT_ORDER') {
        potentialResults = [action.payload.result];
      } else {
        let idx;
        if (action.type === 'LOAD_MORE_DETAILS') {
          idx = action.payload.idx;
        } else {
          idx = 0;
        }

        potentialResults = _.map(resultsOrder.slice(idx, idx + NUMBER_OF_DETAILS_TO_FETCH), (id) => {
          return results[id];
        }).filter(value => value !== false) as SearchResult[];
      }

      missingDetails = _.filter(potentialResults, (result) => {
        // Protect against undefined.
        return result && !details[result.name];
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
    .map((results: { locations: Array<ResultDetail>, error?: boolean; }) => {
      if (results.error) {
        return errorLoadingDetails();
      }
      const obj = {};
      _.each(results.locations, (location) => {
        const name = location.name;
        obj[name] = location;
      });
      return updateSearchResultDetail(obj);
    });

const fetchPlaceWithId: Epic<AllPossibleEpicAcations, State> = (action$, store) =>
  action$
    .ofType('FETCH_PLACE_WITH_ID')
    .filter((action: FetchPlaceWithId) => {
      const id = action.payload.id;
      const state = store.getState();
      return !state.searchResults.results[id];
    })
    .switchMap((action: FetchPlaceWithId) =>
      Observable.ajax.getJSON('/api/place/' + action.payload.id)
        .catch((err) => {
          return Observable.of({ location: undefined, error: true, id: action.payload.id });
        })
    )
    .map((result: { location: any; error?: boolean; id: string; }) => {
      // TODO: handle error
      if (result.error) {
        return updateSearchResultWithError(result.id);
      } else {
        return updateSearchResultWithoutOrder(result.location);
      }
    });

// Load near by places
const fetchAroundAPlace: Epic<AllPossibleEpicAcations | {type: string }, State> = (action$, store) =>
  action$
    .ofType('UPDATE_SEARCH_RESULT_DETAILS')
    .filter((action: UpdateSearchResultDetail) => {
      return _.size(action.payload.details) === 1;
    })
    .map((action: UpdateSearchResultDetail) => {
      const name = _.keys(action.payload.details)[0];

      const state = store.getState();
      const r = _.find(state.searchResults.results, (result) => {
        return result && result.name === name;
      });
      let details: ResultDetail | undefined;

      if (r && !state.searchResults.placeAround[r.name]) {
        if (!state.searchResults.placeAround[r.name]) {
          details = state.searchResults.resultDetail[r.name];
        }
      }
      return { details, name: r && r.name };
    })
    .filter((params: { details: ResultDetail | undefined; name: string; }) => {
      console.log('filter', params);
      return !!params.details;
    })
    .map((params: { details: ResultDetail; name: string }) => {
      const state = store.getState();
      const { details, name } = params;
      return {
        lat: details.details.geometry.location.lat,
        lng: details.details.geometry.location.lng,
        days: state.search.days,
        name
      };
    })
    .switchMap((params: { lat: number; lng: number; days: number | undefined; name: string; }) =>
      Observable.ajax.getJSON('/api/around?' + queryString.stringify({
        lat: params.lat, lng: params.lng, days: params.days
      }))
        .catch((err) => {
          return Observable.of({ location: undefined, error: true });
        })
        .map((result: { locations: SearchResult[]; error: boolean; }) => {
          return {
            ...result,
            name: params.name
          };
        })
    )
    .map((result: { locations: SearchResult[]; name: string; error: boolean; } ) => {
      // TODO: handle error
      if (!result.error) {
        return updatePlaceAround(result.locations, result.name);
      }
      return { type: 'NO_OP' };
    });

export const searchEpics = combineEpics(searchEpic, loadMoreSearchDetails, fetchPlaceWithId, fetchAroundAPlace);
