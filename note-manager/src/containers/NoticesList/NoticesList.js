import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNotices } from '../../store/selectors/notices';
import { getSelectedDir } from '../../store/selectors/directories';
import NoticeCard from '../../components/NoticeCard/NoticeCard';
import FancyButton from '../../components/UI/FancyButton/FancyButton';
import { directoryShape, historyShape } from '../PropTypes';
import { createNoticeRedirect, updateNoticeTitle, updateNoticeRedirect } from '../../store/actions';
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
                                updateNoticeRedirect={(id) => props.updateNoticeRedirect(id, redirect)} />
                        ))}
                    </div>
                ) : (
                    <p>Nothing to show here...</p>
                )}
            <div className={classes.NoticesListFooter}>
                <FancyButton clicked={() => props.createNoticeRedirect(redirect)}>Create a new Note</FancyButton>
            </div>
        </Fragment>
    );
};

NoticesList.propTypes = {
    notices: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        directoryId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
    })),
    selectedDir: directoryShape,
    history: historyShape.isRequired,
    createNoticeRedirect: PropTypes.func.isRequired,
    updateNoticeTitle: PropTypes.func.isRequired,
    updateNoticeRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        notices: getNotices(state),
        selectedDir: getSelectedDir(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNoticeRedirect: (redirect) => dispatch(createNoticeRedirect({ redirect })),
        updateNoticeTitle: (id, title) => dispatch(updateNoticeTitle({ id, title })),
        updateNoticeRedirect: (id, redirect) => dispatch(updateNoticeRedirect({ id, redirect })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticesList);
