import React from "react";
import "./Blogs.css"; // Import custom CSS for Blog styling
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="container mt-5">
      <h1 className="card dsm-gradient-text custom-h1-color">
        Mental Health Blogs - Get the latest Insights and Advice from the Best
        Psychologists and Counselors
      </h1>

      <div className="card smaller-card">
        <div className="et_pb_container clearfix">
          <div className="et_pb_text_overlay_wrapper">
            <div className="psychologist-section">
              <div className="row">
                <div className="col-2">
                  <img
                    src="/images/2.png"
                    alt="Psychologist"
                    className="psychologist-image rounded-circle"
                  />
                </div>
                <div className="col-10">
                  <h3 className="psychologist-name">Dr. John Doe</h3>
                </div>
              </div>
            </div>
            <h4 className="et_pb_slide_title">
              <a href="#" className="custom-link-color">
                Understanding Depression and Effective ways to Heal
              </a>
            </h4>
          </div>
          <div className="et_pb_button_wrapper custom-button-color">
            <a className="et_pb_button et_pb_more_button">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
