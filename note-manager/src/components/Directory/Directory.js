import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import classes from './Directory.module.css';

const Directory = props => (
    <div className={classes.Directory}>
        <FontAwesomeIcon icon={faFolder} className={classes.FolderIcon} size={'lg'} />
        {props.name}
    </div>
);

Directory.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Directory;
