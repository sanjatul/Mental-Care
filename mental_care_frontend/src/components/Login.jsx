import React from "react";
// import "./style.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div
        className=" form_container p-5 rounded bg-white"
        style={{
          backgroundColor: "#e0e0e0", // A monochrome (gray) background color
          width: "600px", // Make the form wider
          maxWidth: "90%", // Ensure responsiveness
        }}
      >
        <form>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
            />
          </div>

          <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#3498db" }}
            >
              Sign in
            </button>
          </div>
          <p className="text-end mt-2">
            Forgot <a href="">Password?</a>
            <Link to="/" className="ms-2">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
