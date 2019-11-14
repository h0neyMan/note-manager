import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faPlus, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import DirectoriesManager from './DirectoriesManager/DirectoriesManager';
import { fetchDirectories, previewCreateDirectory } from '../../store/actions';
import classes from './NoteManager.module.css';

const NoteManager = props => {
    useEffect(() => {
        props.fetchDirectories();
    }, [props.fetchDirectories]);

    return (
        <div className={classes.NoteManager}>
            <div className={classes.SidePanel}>
                <ManagerActionButton clicked={props.previewCreateDirectory} icon={faPlus} text={'Add'} />
                <ManagerActionButton clicked={props.previewCreateDirectory} icon={faPencilAlt} text={'Add'} />
                <ManagerActionButton clicked={props.previewCreateDirectory} icon={faTimes} text={'Remove'} />
            </div>
            <div className={classes.DirectoriesList}>
                <DirectoriesManager />
            </div>
        </div>
    );
};

NoteManager.propTypes = {
    fetchDirectories: PropTypes.func.isRequired,
    previewCreateDirectory: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirectories: () => dispatch(fetchDirectories()),
        previewCreateDirectory: () => dispatch(previewCreateDirectory()),
    };
};

export default connect(null, mapDispatchToProps)(NoteManager);
