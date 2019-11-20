import { put, call, select } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios';
import normalize from '../normalize/notices';
import { getById } from '../selectors/notices';
import { getSelectedDirId } from '../selectors/directories';

export function * fetchNotices() {
    try {
        yield put(actions.fetchNoticesStart());
        const response = yield call([axios, 'get'], '/notices');
        const normalizedResponse = yield call(normalize, response.data);
        yield put(actions.fetchNoticesSuccess(normalizedResponse));
    } catch (error) {
        yield put(actions.fetchNoticesFail(error));
    }
}

export function * createNotice({ payload: { title, description, tags, directoryId, redirect }}) {
    try {
        yield put(actions.createNoticeStart());
        const data = {
            title,
            description,
            tags,
            directoryId,
        };
        const response = yield call([axios, 'post'], '/notices', data);
        yield put(actions.createNoticeSuccess(response.data));
        const selectedDirId = yield select(getSelectedDirId);
        yield call(redirect, `/directory/${selectedDirId}`);
    } catch (error) {
        yield put(actions.createNoticeFail(error));
    }
}

export function * updateNoticeTitle({ payload: { id, title }}) {
    try {
        yield put(actions.updateNoticeTitleStart());
        const byId = yield select(getById);
        const note = {
            ...byId[id],
            title: title,
        };
        yield call([axios, 'put'], `/notices/${id}`, note);
        yield put(actions.updateNoticeTitleSuccess({ id, title }));
    } catch (error) {
        yield put(actions.updateNoticeTitleFail(error));
    }
}

export function * updateNotice({ payload: { id, title, description, tags, redirect }}) {
    try {
        yield put(actions.updateNoticeStart());
        const byId = yield select(getById);
        const note = {
            ...byId[id],
            title,
            description,
            tags,
        };
        yield call([axios, 'put'], `/notices/${id}`, note);
        yield put(actions.updateNoticeSuccess({ id, title, description, tags }));
        const selectedDirId = yield select(getSelectedDirId);
        yield call(redirect, `/directory/${selectedDirId}`);
    } catch (error) {
        yield put(actions.updateNoticeFail(error));
    }
}

export function * updateNoticeRedirect({ payload: { id, redirect }}) {
    yield call(redirect, `/notice/edit/${id}`);
}

export function * createNoticeRedirect({ payload: { redirect }}) {
    yield call(redirect, '/notice/create');
}
