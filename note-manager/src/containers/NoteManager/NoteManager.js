import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDirectories } from '../../store/actions';

const NoteManager = props => {
    useEffect(() => {
        props.fetchDirectories();
    }, [props.fetchDirectories]);

    return (
        <p>Note manager contents go here...</p>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirectories: () => dispatch(fetchDirectories()),
    };
};

NoteManager.propTypes = {
    fetchDirectories: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NoteManager);
