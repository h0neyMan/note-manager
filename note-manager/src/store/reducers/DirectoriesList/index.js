import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {
    directoriesByParent: {},
    rootDirId: null,
    selectedDirectoryId: null,
};

const fetchDirectoriesSuccess = (state, action) => {
    return {
        directoriesByParent: action.payload.allIds
            .map(id => action.payload.byId[id])
            .filter(dir => dir.parentId)
            .reduce((prevValue, currValue) => {
                const newValue = { id: currValue.id, folded: true };

                if (prevValue[currValue.parentId]) {
                    prevValue[currValue.parentId].push(newValue);
                } else {
                    prevValue[currValue.parentId] = [ newValue ];
                }
                return prevValue;
            }, {}),
        rootDirId: action.payload.allIds
            .filter(dirId => !action.payload.byId[dirId].parentId)[0],
    };
};

const triggerDirectoryFold = (state, action) => {
    const directories = state.directoriesByParent[action.payload.parentId];
    let updatedDirectoriesByParent = state.directoriesByParent;

    const triggeredDirIndex = directories.findIndex(dir => dir.id === action.payload.id);
    updatedDirectoriesByParent = {
        ...state.directoriesByParent,
        [action.payload.parentId]: [
            ...directories.slice(0, triggeredDirIndex),
            { ...directories[triggeredDirIndex], folded: !directories[triggeredDirIndex].folded },
            ...directories.slice(triggeredDirIndex + 1),
        ],
    };

    return {
        ...state,
        directoriesByParent: updatedDirectoriesByParent,
        selectedDirectoryId: action.payload.id,
    };
};

export default createReducer(initialState, {
    [actionTypes.FETCH_DIRECTORIES_SUCCESS]: fetchDirectoriesSuccess,
    [actionTypes.TRIGGER_DIRECTORY_FOLD]: triggerDirectoryFold,
});
