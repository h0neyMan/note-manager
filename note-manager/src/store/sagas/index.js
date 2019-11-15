import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { fetchDirectories, createDirectory, editDirectory } from './directories';

export function * watchDirectories() {
    yield takeEvery(actionTypes.FETCH_DIRECTORIES, fetchDirectories);
    yield takeEvery(actionTypes.CREATE_DIRECTORY, createDirectory);
    yield takeEvery(actionTypes.EDIT_DIRECTORY, editDirectory);
}
