import * as actionTypes from './actionTypes';

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

export const fetchDirectoriesSuccess = (directories) => {
    return {
        type: actionTypes.FETCH_DIRECTORIES_SUCCESS,
        directories: directories,
    };
};
