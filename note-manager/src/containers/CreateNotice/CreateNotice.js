import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { createNotice, directoriesRedirect } from '../../store/actions';
import { getSelectedDir } from '../../store/selectors/directories';
import { directoryShape, historyShape, matchShape } from '../PropTypes';
import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import Multiselect from '../../components/UI/Multiselect/Multiselect';
import FancyButton from '../../components/UI/FancyButton/FancyButton';
import classes from './CreateNotice.module.css';

const CreateNotice = props => {
    let [values, setValues] = useState([]);

    const handleChange = (ev) => {
        setValues(ev);
    };

    const backToListHandler = () => {
        props.directoriesRedirect((routeName) => props.history.push(routeName));
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const data = {
            title: ev.target.title.value,
            description: ev.target.description.value,
            tags: values.map(val => val.value),
            directoryId: props.createNoticeDir.id,
            redirect: (routeName) => props.history.push(routeName),
        };
        props.createNotice(data);
    };

    return (
        <div className={classes.CreateNotice}>
            <h2>Create a notice in directory &apos;{props.createNoticeDir.name}&apos;</h2>
            <form onSubmit={handleSubmit}>
                <ul className={classes.Form}>
                    <li>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" placeholder="Enter Title here" required />
                    </li>
                    <li>
                        <label htmlFor="description">Description</label>
                        <textarea rows="6" id="description" placeholder="Enter some description here" required />
                    </li>
                    <li>
                        <label htmlFor="tags">Tags</label>
                        <Multiselect className={classes.Multiselect} values={values} handleChange={handleChange}/>
                    </li>
                </ul>
                <div className={classes.SubmitContainer}>
                    <FancyButton type="submit">Create</FancyButton>
                </div>
            </form>
            <div>
                <ManagerActionButton
                    icon={faArrowCircleLeft}
                    text={'Back to list'}
                    clicked={backToListHandler}/>
            </div>
        </div>
    );
};

CreateNotice.propTypes = {
    match: matchShape.isRequired,
    createNoticeDir: directoryShape.isRequired,
    history: historyShape.isRequired,
    createNotice: PropTypes.func.isRequired,
    directoriesRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        createNoticeDir: getSelectedDir(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNotice: (notice) => dispatch(createNotice(notice)),
        directoriesRedirect: (redirect) => dispatch(directoriesRedirect({ redirect })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotice);
