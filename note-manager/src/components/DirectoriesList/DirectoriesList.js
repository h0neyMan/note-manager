import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Directory from './Directory/Directory';
import { directoryShape } from '../../containers/NoteManager/PropTypes';

const DirectoriesList = props => {
    const currentTab = props.tab || 0;
    let children = null;

    if (!props.directory.folded) {
        children = props.childrenByParentSelector(props.directory.id);
        if (children) {
            children = children.map(directory => (
                <Fragment key={directory.id}>
                    <Directory
                        tab={currentTab}
                        name={directory.name}
                        isSelected={directory.id === props.selectedDirId}
                        folded={directory.folded}
                        onClick={() => props.triggerDirectoryFold(directory)} />
                    <DirectoriesList
                        tab={currentTab + 1}
                        directory={directory}
                        selectedDirId={props.selectedDirId}
                        childrenByParentSelector={props.childrenByParentSelector}
                        triggerDirectoryFold={props.triggerDirectoryFold} />
                </Fragment>
            ));
        }
    }

    return children;
};

DirectoriesList.propTypes = {
    directory: directoryShape.isRequired,
    tab: PropTypes.number,
    selectedDirId: PropTypes.number,
    childrenByParentSelector: PropTypes.func.isRequired,
    triggerDirectoryFold: PropTypes.func.isRequired,
};

export default DirectoriesList;
