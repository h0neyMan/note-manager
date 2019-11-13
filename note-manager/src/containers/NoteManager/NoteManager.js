import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faPlus, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import Directory from '../../components/Directory/Directory';
import { fetchDirectories } from '../../store/actions';
import { getDirectories } from '../../store/selectors/directories';
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
                {props.directories.map(directory => (
                    <Directory key={directory.id} name={directory.name} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        directories: getDirectories(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirectories: () => dispatch(fetchDirectories()),
    };
};

NoteManager.propTypes = {
    directories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    fetchDirectories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteManager);
