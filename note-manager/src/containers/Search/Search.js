import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllNotices } from '../../store/selectors/notices';
import { noticeShape } from '../PropTypes';
import NoticeCard from '../../components/NoticeCard/NoticeCard';
import NoticesList from '../NoticesManager/NoticesList';
import classes from './Search.module.css';

const Search = props => {
    return (
        <Fragment>
            <div className={classes.SearchContainer}>
                <input type="text" placeholder="Type to search..." />
            </div>
            <NoticesList notices={props.notices}>
                {(notice) => (
                    <NoticeCard key={notice.id}>
                        <h3>{notice.title}</h3>
                    </NoticeCard>
                )}
            </NoticesList>
        </Fragment>
    );
};

Search.propTypes = {
    notices: PropTypes.arrayOf(noticeShape).isRequired,
};

const mapStateToProps = state => {
    return {
        notices: getAllNotices(state),
    };
};

export default connect(mapStateToProps)(Search);
