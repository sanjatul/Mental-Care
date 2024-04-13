import React from "react";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "280px", height: "100vh" }}
      >
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <NavLink to="dashboard" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Dashboard
            </NavLink>
            <hr />
          </li>
          <li>
            <NavLink to="setting" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              My Blogs
            </NavLink>
            <hr />
          </li>
          <li>
            <NavLink to="create-appointments" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Create Appointments
            </NavLink>
            <hr />
          </li>
          <li>
            <NavLink to="offline-appointments" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Messages
            </NavLink>
            <hr />
          </li>
          <li>
            <NavLink to="appointments" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Appointments
            </NavLink>
            <hr />
          </li>
          <li>
            <NavLink to="setting" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Profile Setting
            </NavLink>
            <hr />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
