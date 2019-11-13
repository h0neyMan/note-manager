import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './ManagerActionButton.module.css';

const ManagerActionButton = props => (
    <button className={classes.ActionButton}>
        <FontAwesomeIcon icon={props.icon} size={'4x'} />
        <div>{props.text}</div>
    </button>
);

ManagerActionButton.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
};

export default ManagerActionButton;
