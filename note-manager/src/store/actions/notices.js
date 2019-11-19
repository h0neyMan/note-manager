import * as actionTypes from './actionTypes';
import { createPayloadActionCreator, createErrorActionCreator } from '../../utils/actions';

export const fetchNotices = () => ({ type: actionTypes.FETCH_NOTICES });

export const fetchNoticesStart = () => ({ type: actionTypes.FETCH_NOTICES_START });

export const fetchNoticesFail = createErrorActionCreator(actionTypes.FETCH_NOTICES_FAIL);

export const fetchNoticesSuccess = createPayloadActionCreator(actionTypes.FETCH_NOTICES_SUCCESS);

export const createNoticeInit = createPayloadActionCreator(actionTypes.CREATE_NOTICE_INIT);

export const createNoticeRedirect = createPayloadActionCreator(actionTypes.CREATE_NOTICE_REDIRECT);

export const createNotice = createPayloadActionCreator(actionTypes.CREATE_NOTICE);

export const createNoticeStart = () => ({ type: actionTypes.CREATE_NOTICE_START });

export const createNoticeFail = createErrorActionCreator(actionTypes.CREATE_NOTICE_FAIL);

export const createNoticeSuccess = createPayloadActionCreator(actionTypes.CREATE_NOTICE_SUCCESS);
