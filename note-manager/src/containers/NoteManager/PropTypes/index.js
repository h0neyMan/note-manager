import PropTypes from 'prop-types';

const directoryShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});

export { directoryShape };
