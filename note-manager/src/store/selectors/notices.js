import { createSelector } from 'reselect';
import { getSelectedDirId } from './directories';

const getById = state => state.notices.byId;
const getAllIds = state => state.notices.allIds;

export const getNotices = createSelector(
    getById,
    getAllIds,
    getSelectedDirId,
    (byId, allIds, selectedDirId) => allIds.map(id => byId[id]).filter(notice => notice.directoryId === selectedDirId),
);
