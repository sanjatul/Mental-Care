import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { authUserActions } from "../../../store/authUserSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      userName: email,
      password: password,
    };

    try {
      const response = await fetch("https://localhost:7254/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.isSuccess == false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or password was incorrect!",
        });
      } else if (data.result != null) {
        disPatch(authUserActions.addauthUser(data.result));
        window.localStorage.setItem("mc_authUser", JSON.stringify(data.result));
        navigate("/home");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div
        className={`${styles.loginForm} form_container p-5 rounded bg-white`}
      >
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">
            <b>LOG IN</b>
          </h3>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="d-flex justify-content-end">
              <Link to="/forget-password">Forgot Password?</Link>
            </div>
          </div>

          {/* <div className="mb-2">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember me
            </label>
          </div> */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#3498db" }}
            >
              Log in
            </button>
          </div>
          <p className="text-end mt-2">
            Don't have any account yet? Sign up{" "}
            <Link to="/signup-user" className="ms-2">
              General User
            </Link>{" "}
            or{" "}
            <Link to="/signup-psychologist" className="ms-2">
              Psychologist
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
