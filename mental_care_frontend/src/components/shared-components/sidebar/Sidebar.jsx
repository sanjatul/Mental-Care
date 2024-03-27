import React from "react";

const Sidebar = () => {
  return (
    <div className="col-md-3 d-flex flex-column" style={{ height: "100vh" }}>
      <div
        className=""
        style={{ width: "280px", flex: "1", background: "#3498db" }}
      >
        {" "}
        <hr />
        <div className="d-flex flex-column flex-grow-1">
          <br />

          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#home"></use>
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#speedometer2"></use>
                </svg>
                Online Appointment
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#table"></use>
                </svg>
                Offline Appointment
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#grid"></use>
                </svg>
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlink:href="#people-circle"></use>
                </svg>
                My Blogs
              </a>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
