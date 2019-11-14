import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {};

const fetchDirectoriesSuccess = (state, action) => {
    return action.payload.byId;
};

const createDirectorySuccess = (state, action) => {
    return {
        ...state,
        [action.payload.id]: action.payload,
    };
};

const reducer = createReducer(initialState, {
    [actionTypes.FETCH_DIRECTORIES_SUCCESS]: fetchDirectoriesSuccess,
    [actionTypes.CREATE_DIRECTORY_SUCCESS]: createDirectorySuccess,
});

export default reducer;
