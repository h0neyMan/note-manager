import * as actionTypes from './actionTypes';

export const fetchDirectories = () => {
    return {
        type: actionTypes.FETCH_DIRECTORIES,
    };
};

export const fetchDirectoriesStart = () => {
    return {
        type: actionTypes.FETCH_DIRECTORIES_START,
    };
};

export const fetchDirectoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_DIRECTORIES_FAIL,
        error: error,
    };
};

export const fetchDirectoriesSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_DIRECTORIES_SUCCESS,
        payload: payload,
    };
};
