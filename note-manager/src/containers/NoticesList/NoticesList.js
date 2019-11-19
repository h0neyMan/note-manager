import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNotices } from '../../store/selectors/notices';
import { getSelectedDir } from '../../store/selectors/directories';
import NoticeCard from '../../components/NoticeCard/NoticeCard';
import FancyButton from '../../components/UI/FancyButton/FancyButton';
import { directoryShape } from '../PropTypes';
import classes from './NoticesList.module.css';

const NoticesList = props => {
    return (
        <Fragment>
            <div className={classes.NoticesListHeader}>
                <h2>Contents of &apos;{props.selectedDir.name}&apos;</h2>
            </div>
            {props.notices.length > 0
                ? (
                    <div className={classes.NoticesList}>
                        {props.notices.map(notice => (
                            <NoticeCard key={notice.id} title={notice.title} />
                        ))}
                    </div>
                ) : (
                    <p>Nothing to show here...</p>
                )}
            <div className={classes.NoticesListFooter}>
                <FancyButton>Create a new Note</FancyButton>
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
};

const mapStateToProps = state => {
    return {
        notices: getNotices(state),
        selectedDir: getSelectedDir(state),
    };
};

export default connect(mapStateToProps)(NoticesList);
