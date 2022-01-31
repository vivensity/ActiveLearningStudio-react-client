/* eslint-disable */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import teamicon from 'assets/images/sidebar/users-team.svg';
import administrate from 'assets/images/sidebar/administrate.png';
import foldericon from 'assets/images/svg/projectFolder.svg';
import interactiveVideo from 'assets/images/svg/Interactivevideos.svg';
import { allSidebarProjects } from 'store/actions/project';
import instanceadmin from 'assets/images/Instanceadmin.svg';

import './style.scss';
import { clearTeamPermissions } from 'store/actions/team';

const PROJECTS = 'projects';
const CHANNEL = 'channel';

function Sidebar(props) {
  const { location } = props;

  const dispatch = useDispatch();

  const allState = useSelector((state) => state);
  useEffect(() => {
    document.body.classList.add('collapsed');
  }, []);

  const organization = useSelector((state) => state.organization);
  const { permission, currentOrganization } = organization;

  useEffect(() => {
    if (location.pathname.includes('teams/')) {
      const teamId = parseInt(location.pathname.split('teams/')[1], 10);
      if (teamId) {
        // setSelectedTeam(teamId);

        if (location.pathname.includes(PROJECTS)) {
          // setSelectedCategory(PROJECTS);
        } else if (location.pathname.includes(CHANNEL)) {
          // setSelectedCategory(CHANNEL);
        } else {
          // setSelectedCategory(TEAM);
        }
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!allState.sidebar.isLoaded && organization.activeOrganization) {
      dispatch(allSidebarProjects());
    }
  }, [allState.sidebar.isLoaded, organization.activeOrganization, dispatch]);

  return (
    <aside className="sidebar-all">
      {permission?.Project?.includes('project:view') && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}`} onClick={() => dispatch(clearTeamPermissions())}>
            <div className="row-sidebar">
              <img src={foldericon} alt="" />
              <div className="sidebar-headings">My Projects</div>
            </div>
          </Link>
        </>
      )}
      {/* Interactive videos */}
      {permission?.Video?.includes('video:view') && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/video`} onClick={() => dispatch(clearTeamPermissions())}>
            <div className="row-sidebar">
              <img src={interactiveVideo} alt="" />
              <div className="sidebar-headings">My Interactive videos</div>
            </div>
          </Link>
        </>
      )}
      {permission?.Team?.includes('team:view') && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/teams`}>
            <div className="row-sidebar">
              <img src={teamicon} alt="" />
              <div className="sidebar-headings">Teams</div>
            </div>
          </Link>
        </>
      )}
      {permission?.Organization?.length && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/admin`} onClick={() => dispatch(clearTeamPermissions())}>
            <div className="row-sidebar">
              <img src={administrate} alt="" />
              <div className="sidebar-headings">Admin Panel</div>
            </div>
          </Link>
        </>
      )}

      {!currentOrganization?.parent && (
        <>
          <Link to={`/org/${allState.organization.currentOrganization?.domain}/instant-admin`} onClick={() => dispatch(clearTeamPermissions())}>
            <div className="row-sidebar">
              <img src={instanceadmin} alt="" />
              <div className="sidebar-headings">Instance Admin</div>
            </div>
          </Link>
        </>
      )}
    </aside>
  );
}

Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
