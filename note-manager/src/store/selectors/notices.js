import { createSelector } from 'reselect';
import { getSelectedDirId, getById as getDirectoryById } from './directories';

const getById = state => state.notices.byId;
const getAllIds = state => state.notices.allIds;
const getCreateNoticeSelectedDirId = state => state.createNotice.selectedDirectoryId;

export const getNotices = createSelector(
    getById,
    getAllIds,
    getSelectedDirId,
    (byId, allIds, selectedDirId) => allIds.map(id => byId[id]).filter(notice => notice.directoryId === selectedDirId),
);

export const getCreateNoticeDir = createSelector(
    getCreateNoticeSelectedDirId,
    getDirectoryById,
    (createNoticeSelectedDir, directoryById) => ({
        id: 0,
        name: '',
        ...directoryById[createNoticeSelectedDir],
    }),
);
