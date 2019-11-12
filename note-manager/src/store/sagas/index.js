import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { fetchDirectories } from './directories';

export function * watchDirectories() {
    yield takeEvery(actionTypes.FETCH_DIRECTORIES, fetchDirectories);
}
