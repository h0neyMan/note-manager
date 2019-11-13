import { createSelector } from 'reselect';

const getById = state => state.directories.byId;
const getDirectoriesByParent = state => state.directoriesList.directoriesByParent;
const getRootDirId = state => state.directoriesList.rootDirId;
export const getSelectedDirId = state => state.directoriesList.selectedDirectoryId;

export const getChildrenByParentSelector = createSelector(
    getDirectoriesByParent,
    getById,
    (directoriesByParent, byId) => (dirId) =>
        directoriesByParent[dirId]
            ? directoriesByParent[dirId].map(dir => ({ ...byId[dir.id], ...dir }))
            : null,
);

export const getRootDir = createSelector(
    getById,
    getRootDirId,
    (byId, rootDirId) => byId[rootDirId] || { id: 0, name: '' },
);
