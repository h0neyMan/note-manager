import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {};

const fetchNoticesSuccess = (state, action) => {
    return action.payload.byId;
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_NOTICES_SUCCESS]: fetchNoticesSuccess,
});

export default reducer;
