import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faPlus, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import DirectoriesManager from './DirectoriesManager/DirectoriesManager';
import { fetchDirectories } from '../../store/actions';
import classes from './NoteManager.module.css';

const NoteManager = props => {
    useEffect(() => {
        props.fetchDirectories();
    }, [props.fetchDirectories]);

    return (
        <div className={classes.NoteManager}>
            <div className={classes.SidePanel}>
                <ManagerActionButton icon={faPlus} text={'Add'} />
                <ManagerActionButton icon={faPencilAlt} text={'Add'} />
                <ManagerActionButton icon={faTimes} text={'Remove'} />
            </div>
            <div className={classes.DirectoriesList}>
                <DirectoriesManager />
            </div>
        </div>
    );
};

NoteManager.propTypes = {
    fetchDirectories: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirectories: () => dispatch(fetchDirectories()),
    };
};

export default connect(null, mapDispatchToProps)(NoteManager);
