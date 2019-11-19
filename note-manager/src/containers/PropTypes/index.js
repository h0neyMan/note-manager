import PropTypes from 'prop-types';

export const directoryShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});
