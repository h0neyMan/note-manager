import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import directoriesReducer from './reducers/directories';
import noticesReducer from './reducers/notices';
import directoriesManagerReducer from './reducers/DirectoriesManager';
import createNoticeReducer from './reducers/CreateNotice';
import { watchDirectories, watchNotices } from './sagas';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : null || compose;

const rootReducer = combineReducers({
    directories: directoriesReducer,
    notices: noticesReducer,
    directoriesManager: directoriesManagerReducer,
    createNotice: createNoticeReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchDirectories);
sagaMiddleware.run(watchNotices);

export default store;
