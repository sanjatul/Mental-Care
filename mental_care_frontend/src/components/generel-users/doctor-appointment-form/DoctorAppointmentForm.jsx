import React from "react";
import styles from "./DoctorAppointmentForm.module.css";

const DoctorAppointmentForm = () => {
  return (
    <div className={`${styles.card} container mt-3`}>
      <h2 className={`${styles.formHeading}`}>Doctor Appointment Form</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="fullName" className={`${styles.formLabel}`}>
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className={`${styles.formLabel}`}>
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            placeholder="Enter your mobile number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className={`${styles.formLabel}`}>
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className={`${styles.formLabel}`}>
            Gender
          </label>
          <select className="form-select" id="gender">
            <option value="" disabled selected>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DoctorAppointmentForm;
