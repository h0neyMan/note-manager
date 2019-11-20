import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import classes from './NoticeCard.module.css';

const NoticeCard = props => {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);

    const handleBlur = () => {
        if (title !== props.title) {
            props.updateNoticeTitle(props.id, title);
        }
        setEditing(false);
    };

    return (
        <div className={classes.NoticeCard}>
            <FontAwesomeIcon icon={faFileAlt} size="4x" />
            {isEditing ? (
                <input
                    autoFocus
                    onBlur={handleBlur}
                    className={classes.InlineInput}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"></input>
            ) : (
                <h3 className={classes.NoteTitle} onClick={() => setEditing(true)}>{props.title}</h3>
            )}
            <div className={classes.ButtonContainer}>
                <button>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </div>
    );
};

NoticeCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    updateNoticeTitle: PropTypes.func.isRequired,
};

export default NoticeCard;
