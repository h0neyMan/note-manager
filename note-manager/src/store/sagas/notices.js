import { put, call, select } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios';
import normalize from '../normalize/notices';
import { getById } from '../selectors/notices';

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
        yield call(redirect, '/');
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

export function * createNoticePreviewRedirect({ payload: { redirect, selectedDirId }}) {
    yield call(redirect, `/notice/create/${selectedDirId}`);
}
