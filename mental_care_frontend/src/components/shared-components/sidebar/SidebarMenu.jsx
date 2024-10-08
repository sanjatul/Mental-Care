import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SidebarMenu.css";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function SidebarMenu() {
  const storeAuthUser = useSelector((store) => store.authUser);
  const [authUser, setAuthUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    setAuthUser(storeAuthUser);
  }, [storeAuthUser]);

  return (
    <div className="container-fluid">
      <div className="row bg-dark">
        <div className=" min-vh-100 d-flex justify-content-between flex-column width">
          <div>
            <br />
            <br />
            <ul className="nav nav-pills flex-column">
              {/* Shared Sidebar Menu*/}
              <li className="nav-item text-white fs-6">
                <NavLink
                  to="dashboard"
                  className="nav-link text-white fs-6"
                  aria-current="page"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-1 fs-6 d-none d-sm-inline">
                    Dashboard
                  </span>
                </NavLink>
                <hr />
              </li>
              {/* Shared Sidebar Menu*/}

              {/* Psychologists Sidebar Menu*/}
              {authUser &&
                Object.keys(authUser).length > 0 &&
                authUser.role == "psychologist" && (
                  <li className="nav-item text-white fs-6">
                    <NavLink
                      to={`/myblogs`}
                      className="nav-link text-white fs-5"
                      aria-current="page"
                    >
                      <i className="bi bi-card-list"></i>
                      <span className="ms-1 fs-6 d-none d-sm-inline">
                        My Blogs
                      </span>
                    </NavLink>
                    <hr />
                  </li>
                )}
              {/* Psychologists Sidebar Menu*/}

              {/* Shared Sidebar Menu*/}

              <li className="nav-item text-white fs-6">
                <NavLink
                  to="profile-setting"
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-person-circle"></i>
                  <span className="ms-1 fs-6 d-none d-sm-inline">
                    Profile Setting
                  </span>
                </NavLink>
                <hr />
              </li>
              {/* Shared Sidebar Menu*/}

              {authUser &&
                Object.keys(authUser).length > 0 &&
                authUser.role == "psychologist" && (
                  <li className="nav-item text-white fs-6">
                    <NavLink
                      to={`/change-password`}
                      className="nav-link text-white fs-5"
                      aria-current="page"
                    >
                      <i className="bi bi-card-list"></i>
                      <span className="ms-1 fs-6 d-none d-sm-inline">
                        Change Password
                      </span>
                    </NavLink>
                    <hr />
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarMenu;
