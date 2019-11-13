import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Directory from '../../../components/Directory/Directory';
import { directoryShape } from '../PropTypes';
import { getChildrenByParentSelector, getSelectedDirId } from '../../../store/selectors/directories';
import { triggerDirectoryFold } from '../../../store/actions';

const DirectoriesList = props => {
    const currentTab = props.tab || 0;
    let children = null;
    if (!props.directory.folded) {
        children = props.childrenByParentSelector(props.directory.id);
        if (children) {
            children = children.map(directory => (
                <DirectoriesList
                    key={directory.id}
                    tab={currentTab + 1}
                    directory={directory}
                    selectedDirId={props.selectedDirId}
                    childrenByParentSelector={props.childrenByParentSelector}
                    triggerDirectoryFold={props.triggerDirectoryFold}/>
            ));
        }
    }

    return (
        <Fragment>
            <Directory
                tab={currentTab}
                name={props.directory.name}
                isSelected={props.directory.id === props.selectedDirId}
                folded={props.directory.folded}
                onClick={() => props.triggerDirectoryFold(props.directory)} />
            {children}
        </Fragment>
    );
};

DirectoriesList.propTypes = {
    directory: directoryShape,
    tab: PropTypes.number,
    selectedDirId: PropTypes.number,
    childrenByParentSelector: PropTypes.func.isRequired,
    triggerDirectoryFold: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        childrenByParentSelector: getChildrenByParentSelector(state),
        selectedDirId: getSelectedDirId(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        triggerDirectoryFold: (directory) => dispatch(triggerDirectoryFold(directory)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoriesList);
