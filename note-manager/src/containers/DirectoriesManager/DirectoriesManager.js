import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './DirectoriesManager.module.css';
import { getChildrenByParentSelector, getSelectedDirId, getRootDir } from '../../store/selectors/directories';
import {
    triggerDirectoryFold,
    selectDirectory,
    createDirectory,
    triggerCreatePreviewOff,
    editDirectory,
    triggerEditPreviewOff } from '../../store/actions';
import { directoryShape } from '../PropTypes';
import DirectoriesList from '../../components/DirectoriesList/DirectoriesList';

const DirectoriesManager = props => {
    let classNames = [classes.DirectoriesManager];
    if (props.selectedDirId === props.rootDir.id) {
        classNames.push(classes.DirectoriesListActive);
    }

    return (
        <div className={classNames.join(' ')} tabIndex={0} onFocus={() => props.selectDirectory(props.rootDir)}>
            <DirectoriesList
                directory={props.rootDir}
                selectedDirId={props.selectedDirId}
                childrenByParentSelector={props.childrenByParentSelector}
                triggerDirectoryFold={props.triggerDirectoryFold}
                onCreateDirectory={props.onCreateDirectory}
                triggerCreatePreviewOff={props.triggerCreatePreviewOff}
                onEditDirectory={props.onEditDirectory}
                triggerEditPreviewOff={props.triggerEditPreviewOff} />
        </div>
    );
};

DirectoriesManager.propTypes = {
    rootDir: directoryShape.isRequired,
    selectedDirId: PropTypes.number,
    childrenByParentSelector: PropTypes.func.isRequired,
    triggerDirectoryFold: PropTypes.func.isRequired,
    selectDirectory: PropTypes.func.isRequired,
    onCreateDirectory: PropTypes.func.isRequired,
    triggerCreatePreviewOff: PropTypes.func.isRequired,
    onEditDirectory: PropTypes.func.isRequired,
    triggerEditPreviewOff: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        childrenByParentSelector: getChildrenByParentSelector(state),
        selectedDirId: getSelectedDirId(state),
        rootDir: getRootDir(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        triggerDirectoryFold: (directory) => dispatch(triggerDirectoryFold(directory)),
        selectDirectory: (directory) => dispatch(selectDirectory(directory)),
        onCreateDirectory: (directory) => dispatch(createDirectory(directory)),
        triggerCreatePreviewOff: (directory) => dispatch(triggerCreatePreviewOff(directory)),
        onEditDirectory: (directory) => dispatch(editDirectory(directory)),
        triggerEditPreviewOff: (directory) => dispatch(triggerEditPreviewOff(directory)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoriesManager);
