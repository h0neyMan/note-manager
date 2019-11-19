import PropTypes from 'prop-types';

export const directoryShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});

export const historyShape = PropTypes.shape({
    push: PropTypes.func.isRequired,
});

export const matchShape = PropTypes.shape({
    params: PropTypes.shape({
        dirId: PropTypes.string.isRequired,
    }).isRequired,
});
