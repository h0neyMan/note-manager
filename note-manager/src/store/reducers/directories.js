import * as actionTypes from '../actions/actionTypes';

const initialState = {
    directories: [],
    error: false,
};

const fetchDirectoriesStart = (state, action) => {
    return {
        ...state,
    };
};

const fetchDirectoriesFail = (state, action) => {
    return {
        ...state,
        error: action.error,
    };
};

const fetchDirectoriesSuccess = (state, action) => {
    return {
        ...state,
        directories: state.directories,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DIRECTORIES_START:
            return fetchDirectoriesStart(state, action);
        case actionTypes.FETCH_DIRECTORIES_FAIL:
            return fetchDirectoriesFail(state, action);
        case actionTypes.FETCH_DIRECTORIES_SUCCESS:
            return fetchDirectoriesSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;
