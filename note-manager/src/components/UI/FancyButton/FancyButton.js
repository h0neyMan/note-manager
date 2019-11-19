import React from 'react';
import PropTypes from 'prop-types';

import classes from './FancyButton.module.css';

const FancyButton = props => {
    return (
        <button className={classes.FancyButton}>
            {props.children}
        </button>
    );
};

FancyButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FancyButton;
