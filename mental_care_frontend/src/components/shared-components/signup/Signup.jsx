import React from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div
        className={`${styles.signupForm} form_container p-5 rounded bg-white`}
      >
        <form>
          <h3 className="text-center">Sign Up </h3>

          <div className="mb-2">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Enter a valid email address"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must be at least 8 characters long, contain both uppercase and lowercase letters, and include at least one special symbol"
              required
            />
          </div>

          <div className="d-grid mt-2">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#3498db" }}
            >
              Sign Up
            </button>
          </div>
          <p className="text-end mt-2">
            Already Regsitered
            <Link to="/signup" className="ms-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signup;
