import React from 'react';
import PropTypes from 'prop-types';

import { directoryShape } from '../../containers/PropTypes';
import Modal from '../UI/Modal/Modal';

const DirectoryDeleteConfirmModal = props => {
    const submitHandler = (e) => {
        e.preventDefault();
        props.onDeleteDirectory(props.directory);
    };

    return (
        <Modal
            show={props.show}
            modalClosed={props.onCancelClick}>
            <h2>Delete Directory &apos;{props.directory.name}&apos;</h2>
            <p>Are you sure you want to delete this directory?</p>
            <form onSubmit={submitHandler}>
                <button type="submit">Delete</button>
                <button type="button" onClick={props.onCancelClick}>Cancel</button>
            </form>
        </Modal>
    );
};

DirectoryDeleteConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    directory: directoryShape.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onDeleteDirectory: PropTypes.func.isRequired,
};

export default DirectoryDeleteConfirmModal;
