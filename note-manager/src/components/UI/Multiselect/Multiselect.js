import React from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';

const Multiselect = props => {
    const newOptionDataHandler = (value, label) => {
        return {
            label: label,
            value: String.prototype.toLocaleLowerCase.call(value),
            isNew: true,
        };
    };

    return (
        <Creatable
            className={props.className}
            onChange={props.handleChange}
            value={props.values}
            getNewOptionData={newOptionDataHandler}
            formatCreateLabel={value => `Create tag '${value}'`}
            isMulti />
    );
};

Multiselect.propTypes = {
    className: PropTypes.string,
    values: PropTypes.array,
    handleChange: PropTypes.func,
};

export default Multiselect;
