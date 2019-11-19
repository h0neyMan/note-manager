import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { fetchDirectories, createDirectory, editDirectory, deleteDirectory } from './directories';
import { fetchNotices } from './notices';

export function * watchDirectories() {
    yield takeEvery(actionTypes.FETCH_DIRECTORIES, fetchDirectories);
    yield takeEvery(actionTypes.CREATE_DIRECTORY, createDirectory);
    yield takeEvery(actionTypes.EDIT_DIRECTORY, editDirectory);
    yield takeEvery(actionTypes.DELETE_DIRECTORY, deleteDirectory);
}

export function * watchNotices() {
    yield takeEvery(actionTypes.FETCH_NOTICES, fetchNotices);
}
