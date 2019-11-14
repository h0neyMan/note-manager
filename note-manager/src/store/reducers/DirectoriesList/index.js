import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';
import { updateObject, updateArray, toLookup, firstOrDefault } from '../../../utils/operations';

const initialState = {
    directoriesByParent: {},
    rootDirId: null,
    selectedDirectoryId: null,
};

const fetchDirectoriesSuccess = (state, { payload: { allIds, byId }}) => {
    const directories = allIds.map(id => byId[id]);
    const rootDirId = firstOrDefault(
        directories,
        dir => !dir.parentId,
        dir => dir.id
    );

    return {
        directoriesByParent: toLookup(
            directories.filter(dir => dir.parentId),
            dir => dir.parentId,
            dir => ({ id: dir.id, folded: true })
        ),
        rootDirId: rootDirId,
        selectedDirectoryId: rootDirId,
    };
};

const triggerDirectoryFold = (state, { payload: { id, parentId } }) => {
    const dirsOnSameLevel = state.directoriesByParent[parentId];

    const updatedArray = updateArray(dirsOnSameLevel,
        dir => dir.id === id,
        dir => ({ folded: !dir.folded }));

    const updatedDirectoriesByParent = updateObject(state.directoriesByParent, {
        [parentId]: updatedArray,
    });

    return updateObject(state, {
        directoriesByParent: updatedDirectoriesByParent,
        selectedDirectoryId: id,
    });
};

const selectDirectory = (state, { payload: { id } }) => {
    return {
        ...state,
        selectedDirectoryId: id,
    };
};

export default createReducer(initialState, {
    [actionTypes.FETCH_DIRECTORIES_SUCCESS]: fetchDirectoriesSuccess,
    [actionTypes.TRIGGER_DIRECTORY_FOLD]: triggerDirectoryFold,
    [actionTypes.SELECT_DIRECTORY]: selectDirectory,
});
