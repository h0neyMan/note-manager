import { createSelector } from 'reselect';

const getById = state => state.directories.byId;
const getDirectoriesByParent = state => state.directoriesManager.directoriesByParent;
const getRootDirId = state => state.directoriesManager.rootDirId;
const getRootDirIsCreatingSubfolder = state => state.directoriesManager.rootDirIsCreatingSubfolder;
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
    getRootDirIsCreatingSubfolder,
    (byId, rootDirId, rootDirIsCreatingSubfolder) => {
        const rootDir = byId[rootDirId] ? byId[rootDirId] : { id: 0, name: '' };
        return { ...rootDir, isCreatingSubfolder: rootDirIsCreatingSubfolder };
    },
);
