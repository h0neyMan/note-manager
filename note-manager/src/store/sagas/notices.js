import { put, call } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios';
import normalize from '../normalize/notices';

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
