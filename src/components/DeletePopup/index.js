import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import './style.scss';

const fadeAnimation = keyframes`${fadeIn}`;

const FaceDiv = styled.div`
  animation: 1s ${fadeAnimation};
`;

// TODO: need to clean up attribute
function Popup(props) {
  const {
    ui,
    hideDeletePopup,
    deleteProject,
    deletePlaylist,
    deleteResource,
  } = props;

  // remove popup when escape is pressed
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      hideDeletePopup(event);
    }
  }, [hideDeletePopup]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const deleteEntity = useCallback((deleteType, id) => () => {
    if (deleteType === 'Project') {
      deleteProject(id);
    } else if (deleteType === 'Playlist') {
      deletePlaylist(id);
    } else if (deleteType === 'Activity') {
      deleteResource(id);
    }
  }, [deleteProject, deletePlaylist, deleteResource]);

  return (
    <FaceDiv className="popup">
      <div className="modal fade" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5>
                {`Delete "${ui.title}"?`}
              </h5>
              <p>
                {`You're about to permanently delete this ${ui.deleteType} and all of its data.`}
              </p>
              <p>Do you want to continue?</p>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-sm btn-danger"
                onClick={deleteEntity(ui.deleteType, ui.id)}
              >
                Delete
              </button>

              <button
                type="button"
                className="btn btn-sm btn-default"
                data-dismiss="modal"
                onClick={hideDeletePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </FaceDiv>
  );
}

Popup.propTypes = {
  ui: PropTypes.object.isRequired,
  hideDeletePopup: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
  deleteResource: PropTypes.func.isRequired,
};

export default Popup;
