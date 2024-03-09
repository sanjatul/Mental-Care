import React from "react";
import "./PsychologistCard.css";
import { VscStarFull } from "react-icons/vsc";
import { Link } from "react-router-dom";

const PsychologistCard = () => {
  return (
    <div className="card card-custom">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <img src="/images/2.png" className="card-img-top" alt="..." />
          </div>
          <div className="col-6">
            <h5 className="card-title">Dr. Nishan Khanna</h5>
            <p className="card-text">
              <div style={{ whiteSpace: "nowrap" }}>
                <h6>Senior Consultant</h6>
                <b>Experience:</b>12 years
                <br />
                <b>Gender:</b>Male
                <br />
                <b>Rating:</b>
                <VscStarFull />
                <VscStarFull />
                <VscStarFull />
                <VscStarFull />
                <br />
                <b>Location:</b>Dhaka
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="ms-2 me-2 mt-1 mb-2">
          <Link
            to={`/psycologist/${123}`}
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
            <a href="#" className="btn btn-primary">
              Offline Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistCard;
