import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faPlus, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { directoryShape } from './PropTypes';
import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import DirectoriesList from './DirectoriesList/DirectoriesList';
import { fetchDirectories } from '../../store/actions';
import { getRootDir } from '../../store/selectors/directories';
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
                <DirectoriesList
                    directory={props.rootDir} />
            </div>
        </div>
    );
};

NoteManager.propTypes = {
    rootDir: directoryShape,
    fetchDirectories: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        rootDir: getRootDir(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirectories: () => dispatch(fetchDirectories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteManager);
