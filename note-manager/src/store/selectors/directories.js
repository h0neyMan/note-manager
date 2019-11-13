import { createSelector } from 'reselect';

const allIdsSelector = state => state.directories.allIds;
const byIdSelector = state => state.directories.byId;

export const getDirectories = createSelector(
    allIdsSelector,
    byIdSelector,
    (allIds, byId) => {
        const directories = allIds.map(id => byId[id]);
        return directories;
    },
);
