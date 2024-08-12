import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PsychologistCard = ({ psychologist }) => {
  return (
    <div className="card h-100 overflow-auto rounded-3">
      <div className="card-body">
        <div className="row">
          <div className="col-5">
            <img
              src={psychologist.profilePicture}
              className="card-img-top img-fluid"
              style={{ maxHeight: "200px", maxWidth: "100%" }}
              alt="Profile"
            />
          </div>
          <div className="col-7 ps-2">
            <h4 className="card-title">
              <b>{psychologist.name}</b>
            </h4>
            <p className="card-text">
              <div style={{ whiteSpace: "wrap" }}>
                <h5>{psychologist.designation}</h5>
                <hr />
                {psychologist.speciality && (
                  <>
                    <b>Speciality:</b> {psychologist.speciality} <br />
                  </>
                )}
                {psychologist.yearsOfExperience && (
                  <>
                    <b>Experience:</b> {psychologist.yearsOfExperience} years{" "}
                    <br />
                  </>
                )}
                {psychologist.gender && (
                  <>
                    <b>Gender:</b> {psychologist.gender} <br />
                  </>
                )}
                {psychologist.location && (
                  <>
                    <b>Location:</b> {psychologist.location}
                  </>
                )}
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="col-6 mb-1">
        <div className="ms-2 me-2">
          <Link
            to={`/psycologist/${psychologist.userId}`}
            className="text-primary text-decoration-underline"
          >
            View Profile
          </Link>
        </div>
      </div>
      <div className="card-footer">
        <div className="row mt-1">
          <div className="col-6">
            <div className="ms-2 me-2 mt-2 mb-2">
              <Link
                to={`/psycologist/${"online"}/${psychologist.userId}`}
                className="btn btn-primary w-100"
              >
                Online Consultation
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="ms-2 me-2 mt-2 mb-2">
              <Link to={`/psycologist/${"offline"}/${psychologist.userId}`} className="btn btn-primary w-100">
                Offline Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistCard;
