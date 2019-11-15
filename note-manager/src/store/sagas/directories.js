import { put, call } from 'redux-saga/effects';

import * as actions from '../actions';
import normalize from '../normalize/directories';
import axios from '../../axios';

export function * fetchDirectories() {
    try {
        yield put(actions.fetchDirectoriesStart());
        const response = yield call([axios, 'get'], '/directories');
        const normalizedResponse = yield call(normalize, response.data);
        const byIds = {
            allIds: normalizedResponse.result,
            byId: normalizedResponse.entities.directories,
        };
        yield put(actions.fetchDirectoriesSuccess(byIds));
    } catch (error) {
        yield put(actions.fetchDirectoriesFail(error));
    }
}

export function * createDirectory(action) {
    try {
        yield put(actions.createDirectoryStart());
        const data = {
            name: action.payload.name,
            parentId: action.payload.parentId,
        };
        const response = yield call([axios, 'post'], '/directories', data);
        yield put(actions.createDirectorySuccess(response.data));
        yield put(actions.triggerCreatePreviewOff({
            id: action.payload.parentId,
            parentId: action.payload.parentParentId,
        }));
    } catch (error) {
        yield put(actions.createDirectoryFail(error));
    }
}

export function * editDirectory(action) {
    try {
        yield put(actions.editDirectoryStart());
        const data = {
            id: action.payload.id,
            name: action.payload.name,
            parentId: action.payload.parentId,
        };
        const response = yield call([axios, 'put'], `/directories/${action.payload.id}`, data);
        yield put(actions.editDirectorySuccess(response.data));
        yield put(actions.triggerEditPreviewOff({
            id: action.payload.id,
            parentId: action.payload.parentId,
        }));
    } catch (error) {
        yield put(actions.createDirectoryFail(error));
    }
}
