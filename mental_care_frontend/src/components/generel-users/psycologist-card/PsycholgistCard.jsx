import React from "react";
import styles from "./PsychologistCard.module.css";
import { Link } from "react-router-dom";

const PsychologistCard = ({ psychologist }) => {
  return (
    <div className={`${styles.cardCustom} card`}>
      <div className="card-body">
        <div className="row">
          <div className="col-5">
            <img
              src={psychologist.profilePicture}
              className="card-img-top"
              alt="..."
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
                {psychologist.speciality != null && (
                  <>
                    <b>Speciality:</b> {psychologist.speciality} <br />
                  </>
                )}
                {psychologist.yearsOfExperience != null && (
                  <>
                    <b>Experience:</b> {psychologist.yearsOfExperience} years{" "}
                    <br />
                  </>
                )}
                {psychologist.gender != null && (
                  <>
                    <b>Gender:</b> {psychologist.gender} <br />
                  </>
                )}

                {psychologist.location != null && (
                  <>
                    <b>Location: </b>
                    {psychologist.location}
                  </>
                )}
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="ms-2 me-2 mb-1">
          <Link
            to={`/psycologist/${psychologist.userId}`}
            className="text-primary text-decoration-underline"
          >
            View Profile
          </Link>
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-6">
          <div className="ms-2 me-2 mt-2 mb-2">
            <a href="#" className="btn btn-primary">
              Online Consultation
            </a>
          </div>
        </div>
        <div className="col-6">
          <div className="ms-2 me-2 mt-2 mb-2">
            <Link to="/book-appointment" className="btn btn-primary">
              Offline Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistCard;
