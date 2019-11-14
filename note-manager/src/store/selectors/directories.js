import { createSelector } from 'reselect';

const getById = state => state.directories.byId;
const getDirectoriesByParent = state => state.directoriesManager.directoriesByParent;
const getRootDirId = state => state.directoriesManager.rootDirId;
const getRootDirIsEditView = state => state.directoriesManager.rootDirIsEditView;
export const getSelectedDirId = state => state.directoriesManager.selectedDirectoryId;

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
    getRootDirIsEditView,
    (byId, rootDirId, rootDirIsEditView) => {
        const rootDir = byId[rootDirId] ? byId[rootDirId] : { id: 0, name: '' };
        return { ...rootDir, isEditView: rootDirIsEditView };
    },
);
