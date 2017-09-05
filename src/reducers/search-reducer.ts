
import { UpdateSearchTerm, ClearSearchTerm, UpdateDays, StartSearch, SearchResult,
  UpdateSearchResult, updateSearchResult, UpdateSearchError, updateSearchError } from '../actions/search-action';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

export interface SearchState {
  query: string;
  days?: number;
  searching: boolean;
  errorMessage: string;
  results: SearchResult[];
}

const INITIAL_STATE: SearchState = {
  query: '',
  days: undefined,
  searching: false,
  results: [],
  errorMessage: ''
};

type SearchAction = UpdateSearchTerm | ClearSearchTerm | UpdateDays | StartSearch |
  UpdateSearchResult | UpdateSearchError;

export default function searchReducer(state: SearchState = INITIAL_STATE, action: SearchAction): SearchState {
  let newState = state;
  switch (action.type) {
    case 'UPDATE_SEARCH_TERM':
      newState = {
        ...state,
        query: action.payload.query
      };
      break;
    case 'CLEAR_SEARCH_TERM':
      newState = {
        ...state,
        query: ''
      };
      break;
    case 'UPDATE_DAYS':
      newState = {
        ...state,
        days: action.payload.days
      };
      break;
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
        errorMessage: ''
      };
      break;
    case 'UPDATE_SEARCH_ERROR':
      newState = {
        ...state,
        searching: false,
        results: [],
        errorMessage: action.payload.message
      };
      break;
    default:
  }
  return newState;
}

type EpicActions = StartSearch | UpdateSearchResult | UpdateSearchError;
const searchEpic: Epic<EpicActions, { search: SearchState; }> = (action$, store) =>
  action$
    .ofType('START_SEARCH')
    .map((action) => {
      const state = store.getState();
      const query = state.search.query;
      const days = state.search.days;
      console.log('query: ' + query + ', days: ' + days);
      return {};
    })
    .delay(2000)
    .map((result) => {
      let results = [{
        name: 'San Francisco',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Alcatraz_Island_as_seen_from_the_East.jpg',
        intro: 'Every neighborhood in San Francisco has its own personality, from the hippie chic of ' +
          'the Upper Haight to the hipster grit of the Mission. The Marina district boasts trendy ' +
          'bistros and postcard-perfect views of the Golden Gate Bridge, while Noe Valley offers ' +
          'quaint and quiet boutiques. Wave hello to the sea lions at Pier 39, and sample local ' +
          'cheese and charcuterie at the Ferry Building. Sit in on a yoga session in Dolores Park ' +
          'or marvel at the Dutch Windmill across from Ocean Beach.',
        pointsOfInterest: [
          {
            name: 'Alcatraz Island',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Alcatraz_Island_as_seen_from_the_East.jpg'
          },
          {
            name: 'Golden Gate Bridge',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/' +
              'Golden_Gate_Bridge_as_seen_from_Fort_Point.jpg'
          },
          { name: 'San Francisco Bay',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/' +
              'San_Francisco_Ferry_Building_%28cropped%29.jpg' },
          { name: 'AT&T Park',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/ATT_Sunset_Panorama.jpg' },
          { name: 'Lands End',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Lands_End_-_San_Francisco_zum_Meer.JPG' },
          { name: 'Palace of Fine Arts Theatre',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/' +
              'Palace_of_Fine_Arts_San_Francisco_January_2014_003.jpg' },
          { name: 'Exploratorium',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/' +
              'Main_Entrance_to_the_Exploratorium_at_Pier_15.jpg' },
          { name: 'Twin Peaks',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Twin_Peaks-San_Francisco.jpg' },
          { name: 'Cable Cars' },
          { name: 'California Academy of Sciences' },
        ]
      }, {
        name: 'New York',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/NYC_Montage_2014_4_-_Jleon.jpg',
        intro: 'Conquering New York in one visit is impossible. Instead, hit the must-sees – the Empire ' +
          'State Building, the Statue of Liberty, Central Park, the Metropolitan Museum of Art – and then ' +
          'explore off the beaten path with visits to The Cloisters or one of the city’s libraries. Indulge ' +
          'in the bohemian shops of the West Village or the fine dining of the Upper West Side. The bustling ' +
          'marketplace inside of Grand Central Station gives you a literal taste of the best the city has to offer.',
        pointsOfInterest: [
          {
            name: 'Central Park',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/' +
              'Southwest_corner_of_Central_Park%2C_looking_east%2C_NYC.jpg'
          },
          { name: 'The National 9/11 Memorial & Museum' },
          {
            name: 'The Metropolitan Museum of Art',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/The_MET.jpg'
          },
          { name: 'Top of the Rock Observation Deck' },
          { name: 'Manhattan Skyline' },
          { name: 'The Metropolitan Museum of Art' },
          { name: 'Grand Central Terminal' },
          { name: 'The High Line' },
          { name: 'Broadway' },
          { name: 'Empire State Building' },
        ]
      }];
      return updateSearchResult(results);
    })
    .catch(() => {
      return Observable.of(updateSearchError('Something went wrong'));
    });

export const searchEpics = combineEpics(searchEpic);
