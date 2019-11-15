import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faPlus, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import DirectoryDeleteConfirmModal from '../../components/DirectoryDeleteConfirmModal/DirectoryDeleteConfirmModal';
import DirectoriesManager from './DirectoriesManager/DirectoriesManager';
import {
    fetchDirectories,
    createDirectoryPreview,
    editDirectoryPreview,
    deleteDirectoryConfirm,
    deleteDirectoryCancel,
    deleteDirectory } from '../../store/actions';
import { getIsEditAndDeleteEnabled, getIsDeleting, getSelectedDir } from '../../store/selectors/directories';
import { directoryShape } from './PropTypes';
import classes from './NoteManager.module.css';

const NoteManager = props => {
    useEffect(() => {
        props.fetchDirectories();
    }, [props.fetchDirectories]);

    return (
        <div className={classes.NoteManager}>
            <div className={classes.SidePanel}>
                <ManagerActionButton clicked={props.createDirectoryPreview} icon={faPlus} text={'Add'} />
                <ManagerActionButton
                    clicked={props.editDirectoryPreview}
                    isDisabled={!props.isEditAndDeleteEnabled}
                    icon={faPencilAlt}
                    text={'Edit'} />
                <ManagerActionButton
                    clicked={props.deleteDirectoryConfirm}
                    isDisabled={!props.isEditAndDeleteEnabled}
                    icon={faTimes}
                    text={'Remove'} />
            </div>
            <div className={classes.DirectoriesList}>
                <DirectoriesManager />
            </div>
            <DirectoryDeleteConfirmModal
                show={props.isDeleting}
                directory={props.selectedDir}
                onCancelClick={props.deleteDirectoryCancel}
                onDeleteDirectory={props.deleteDirectory} />
        </div>
    );
};

NoteManager.propTypes = {
    isEditAndDeleteEnabled: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
    selectedDir: directoryShape.isRequired,
    fetchDirectories: PropTypes.func.isRequired,
    createDirectoryPreview: PropTypes.func.isRequired,
    editDirectoryPreview: PropTypes.func.isRequired,
    deleteDirectoryConfirm: PropTypes.func.isRequired,
    deleteDirectoryCancel: PropTypes.func.isRequired,
    deleteDirectory: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        isEditAndDeleteEnabled: getIsEditAndDeleteEnabled(state),
        isDeleting: getIsDeleting(state),
        selectedDir: getSelectedDir(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirectories: () => dispatch(fetchDirectories()),
        createDirectoryPreview: () => dispatch(createDirectoryPreview()),
        editDirectoryPreview: () => dispatch(editDirectoryPreview()),
        deleteDirectoryConfirm: () => dispatch(deleteDirectoryConfirm()),
        deleteDirectoryCancel: () => dispatch(deleteDirectoryCancel()),
        deleteDirectory: (directory) => dispatch(deleteDirectory(directory)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteManager);
