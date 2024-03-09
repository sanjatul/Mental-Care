// Blogs.jsx

import React from "react";
//import "./Blogs.css"; // Import custom CSS for Blog styling

const Blogs = () => {
  return (
    <div className="container mt-5">
      <h1 className="card dsm-gradient-text">
        Mental Health Blogs - Get the latest Insights and Advice from the Best
        Psychologists and Counselors
      </h1>
      <div className="card smaller-card">
        <div className="et_pb_container clearfix">
          <div className="et_pb_text_overlay_wrapper">
            <h4 className="et_pb_slide_title">
              <a href="#">
                Understanding Depression and Effective ways to Heal
              </a>
            </h4>
            <div className="et_pb_slide_content">
              <div></div>
            </div>
          </div>
          <div className="et_pb_button_wrapper">
            <a className="et_pb_button et_pb_more_button">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
