import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import search, { SearchState, searchEpics } from './search-reducer';

export interface State {
  search: SearchState;
}

const rootEpic = combineEpics(searchEpics);

const epicMiddleWare = createEpicMiddleware(rootEpic);
const middleware = applyMiddleware(epicMiddleWare);

const reducer = combineReducers<State>({
  search
});

export default createStore<State>(reducer, middleware);
