import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { searchEpics } from './search-epic';
import { reducers, State } from './state';

const rootEpic = combineEpics(searchEpics);

const epicMiddleWare = createEpicMiddleware(rootEpic);
const middleware = applyMiddleware(epicMiddleWare);

const reducer = combineReducers<State>(reducers);

export default createStore<State>(reducer, middleware);
