import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';
import {
    updateObject,
    updateArray,
    toLookup,
    firstOrDefault,
    addItemToArray } from '../../../utils/immutableHelpers';

const initialState = {
    directoriesByParent: {},
    rootDirId: null,
    rootDirIsEditView: false,
    selectedDirectoryId: null,
    selectedDirectoryParentId: null,
};

const upateDirectoriesByParent = (state, id, parentId, newPropertiesProvider) => {
    const dirsOnSameLevel = state.directoriesByParent[parentId];

    const updatedArray = updateArray(dirsOnSameLevel,
        dir => dir.id === id,
        newPropertiesProvider);

    const updatedDirectoriesByParent = updateObject(state.directoriesByParent, {
        [parentId]: updatedArray,
    });

    return updatedDirectoriesByParent;
};

const setIsEditView = (state, id, parentId, newProperties) => {
    if (state.selectedDirectoryId === state.rootDirId) {
        return updateObject(state, {
            rootDirIsEditView: newProperties.isEditView,
        });
    }

    const updatedDirectoriesByParent = upateDirectoriesByParent(
        state, id, parentId, () => newProperties);

    return updateObject(state, {
        directoriesByParent: updatedDirectoriesByParent,
    });
};

const fetchDirectoriesSuccess = (state, { payload: { allIds, byId }}) => {
    const directories = allIds.map(id => byId[id]);
    const rootDirId = firstOrDefault(
        directories,
        dir => !dir.parentId,
        dir => dir.id
    );

    return updateObject(state, {
        directoriesByParent: toLookup(
            directories.filter(dir => dir.parentId),
            dir => dir.parentId,
            dir => ({ id: dir.id, folded: true })
        ),
        rootDirId: rootDirId,
        selectedDirectoryId: rootDirId,
    });
};

const createDirectorySuccess = (state, { payload: { id, parentId }}) => {
    const updatedArray = addItemToArray(
        state.directoriesByParent[parentId],
        { id: id, folded: true });

    return updateObject(state, {
        directoriesByParent: updateObject(state.directoriesByParent, {
            [parentId]: updatedArray,
        }),
    });
};

const triggerDirectoryFold = (state, { payload: { id, parentId } }) => {
    const updatedDirectoriesByParent = upateDirectoriesByParent(
        state, id, parentId, dir => ({ folded: !dir.folded, isEditView: false }));

    return updateObject(state, {
        directoriesByParent: updatedDirectoriesByParent,
        selectedDirectoryId: id,
        selectedDirectoryParentId: parentId,
    });
};

const selectDirectory = (state, { payload: { id } }) => {
    return updateObject(state, {
        selectedDirectoryId: id,
        selectedDirectoryParentId: null,
    });
};

const previewCreateDirectory = (state, action) => {
    return setIsEditView(state,
        state.selectedDirectoryId,
        state.selectedDirectoryParentId,
        { folded: false, isEditView: true });
};

const triggerCreatePreviewOff = (state, { payload: { id, parentId } }) => {
    return setIsEditView(state,
        id, parentId, { isEditView: false });
};

export default createReducer(initialState, {
    [actionTypes.FETCH_DIRECTORIES_SUCCESS]: fetchDirectoriesSuccess,
    [actionTypes.TRIGGER_DIRECTORY_FOLD]: triggerDirectoryFold,
    [actionTypes.SELECT_DIRECTORY]: selectDirectory,
    [actionTypes.PREVIEW_CREATE_DIRECTORY]: previewCreateDirectory,
    [actionTypes.CREATE_DIRECTORY_SUCCESS]: createDirectorySuccess,
    [actionTypes.TRIGGER_CREATE_PREVIEW_OFF]: triggerCreatePreviewOff,
});
