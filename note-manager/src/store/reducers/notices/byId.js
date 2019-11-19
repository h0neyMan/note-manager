import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {};

const fetchNoticesSuccess = (state, action) => {
    return action.payload.byId;
};

const createNoticeSuccess = (state, action) => {
    return {
        ...state,
        [action.payload.id]: action.payload,
    };
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_NOTICES_SUCCESS]: fetchNoticesSuccess,
    [actionTypes.CREATE_NOTICE_SUCCESS]: createNoticeSuccess,
});

export default reducer;
