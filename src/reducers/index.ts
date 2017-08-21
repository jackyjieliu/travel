import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

export interface State {
}

const rootEpic = combineEpics();

const epicMiddleWare = createEpicMiddleware(rootEpic);
const middleware = applyMiddleware(epicMiddleWare);

const reducer = combineReducers<State>({

});

export default createStore<State>(reducer, middleware);
