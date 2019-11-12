import { put, call } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios';

export function * fetchDirectories() {
    try {
        yield put(actions.fetchDirectoriesStart());
        const response = yield call([axios, 'get'], '/directories');
        yield put(actions.fetchDirectoriesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchDirectoriesFail(error));
    }
}
