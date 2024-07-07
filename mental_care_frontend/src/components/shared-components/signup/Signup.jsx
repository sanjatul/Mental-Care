import React from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  // Generate an array of age values starting from 15 to 100
  const ageOptions = [];
  for (let i = 15; i <= 100; i++) {
    ageOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div
        className={`${styles.signupForm} form_container p-5 rounded bg-white`}
      >
        <form>
          <h3 className="text-center">Sign Up</h3>
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
            <label htmlFor="fname">Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="form-control"
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
          <div className="mb-2">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="form-control"
              required
            />
          </div>
          <div className="row mb-2">
            <div className="col-md-6">
              <label htmlFor="age">Age</label>
              <select className="form-select" required>
                {ageOptions}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="gender">Gender:</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    required
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                    required
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="others"
                    name="gender"
                    required
                  />
                  <label className="form-check-label" htmlFor="others">
                    Others
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="profilePicture">Select Profile Picture</label>
            <input type="file" className="form-control" />
          </div>
          <div className="d-grid mt-3">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#3498db" }}
            >
              Sign Up
            </button>
          </div>
          <p className="text-end mt-2">
            Already Registered{" "}
            <Link to="/signin" className="ms-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
