import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNotices, getIsDeleting, getDeletingNotice } from '../../store/selectors/notices';
import { getSelectedDir } from '../../store/selectors/directories';
import NoticeCard from '../../components/NoticeCard/NoticeCard';
import FancyButton from '../../components/UI/FancyButton/FancyButton';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import { directoryShape, historyShape, noticeShape } from '../PropTypes';
import {
    createNoticeRedirect,
    updateNoticeTitle,
    updateNoticeRedirect,
    deleteNotice,
    deleteNoticeConfirm,
    deleteNoticeCancel,
} from '../../store/actions';
import classes from './NoticesList.module.css';

const NoticesList = props => {
    const redirect = (routeName) => props.history.push(routeName);

    return (
        <Fragment>
            <div className={classes.NoticesListHeader}>
                <h2>Contents of &apos;{props.selectedDir.name}&apos;</h2>
            </div>
            {props.notices.length > 0
                ? (
                    <div className={classes.NoticesList}>
                        {props.notices.map(notice => (
                            <NoticeCard
                                key={notice.id}
                                id={notice.id}
                                title={notice.title}
                                updateNoticeTitle={props.updateNoticeTitle}
                                updateNoticeRedirect={(id) => props.updateNoticeRedirect(id, redirect)}
                                deleteNoticeConfirm={props.deleteNoticeConfirm} />
                        ))}
                    </div>
                ) : (
                    <p>Nothing to show here...</p>
                )}
            <div className={classes.NoticesListFooter}>
                <FancyButton clicked={() => props.createNoticeRedirect(redirect)}>Create a new Note</FancyButton>
            </div>
            <DeleteConfirmModal
                show={props.isDeleting}
                headerText={`Delete Notice '${props.deletingNotice.title}'`}
                entityText={'notice'}
                onCancelClick={props.deleteNoticeCancel}
                onDeleteDirectory={() => props.deleteNotice(props.deletingNotice)} />
        </Fragment>
    );
};

NoticesList.propTypes = {
    notices: PropTypes.arrayOf(noticeShape).isRequired,
    isDeleting: PropTypes.bool.isRequired,
    deletingNotice: noticeShape,
    selectedDir: directoryShape,
    history: historyShape.isRequired,
    createNoticeRedirect: PropTypes.func.isRequired,
    updateNoticeTitle: PropTypes.func.isRequired,
    updateNoticeRedirect: PropTypes.func.isRequired,
    deleteNoticeCancel: PropTypes.func.isRequired,
    deleteNoticeConfirm: PropTypes.func.isRequired,
    deleteNotice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        notices: getNotices(state),
        selectedDir: getSelectedDir(state),
        isDeleting: getIsDeleting(state),
        deletingNotice: getDeletingNotice(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNoticeRedirect: (redirect) => dispatch(createNoticeRedirect({ redirect })),
        updateNoticeTitle: (id, title) => dispatch(updateNoticeTitle({ id, title })),
        updateNoticeRedirect: (id, redirect) => dispatch(updateNoticeRedirect({ id, redirect })),
        deleteNoticeCancel: () => dispatch(deleteNoticeCancel()),
        deleteNoticeConfirm: (id) => dispatch(deleteNoticeConfirm({ id })),
        deleteNotice: (notice) => dispatch(deleteNotice(notice)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticesList);
