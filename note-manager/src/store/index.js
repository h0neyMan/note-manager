import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import directoriesReducer from './reducers/directories';
import directoriesManagerReducer from './reducers/DirectoriesManager';
import { watchDirectories } from './sagas';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : null || compose;

const rootReducer = combineReducers({
    directories: directoriesReducer,
    directoriesManager: directoriesManagerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchDirectories);

export default store;
