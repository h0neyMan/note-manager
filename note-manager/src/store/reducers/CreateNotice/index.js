import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {
    selectedDirectoryId: null,
};

const createNoticeInit = (state, { payload: { selectedDirId }}) => {
    return {
        selectedDirectoryId: selectedDirId,
    };
};

const reducer = createReducer(initialState, {
    [actionTypes.CREATE_NOTICE_INIT]: createNoticeInit,
});

export default reducer;
