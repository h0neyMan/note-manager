import * as actionTypes from './actionTypes';
import { createPayloadActionCreator, createErrorActionCreator } from '../../utils/actions';

export const fetchNotices = () => ({ type: actionTypes.FETCH_NOTICES });

export const fetchNoticesStart = () => ({ type: actionTypes.FETCH_NOTICES_START });

export const fetchNoticesFail = createErrorActionCreator(actionTypes.FETCH_NOTICES_FAIL);

export const fetchNoticesSuccess = createPayloadActionCreator(actionTypes.FETCH_NOTICES_SUCCESS);
