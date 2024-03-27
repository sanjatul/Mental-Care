// Blogs.jsx

import React from "react";
import styles from "./BookNow.module.css";
import { Link } from "react-router-dom";

const BookNow = () => {
  return (
    <div className={`${styles.card} mt-5`}>
      <div className={`${styles.container} ${styles.doctorProfileContainer}`}>
        <div className={`${styles.centerContent}`}>
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Date : 23/03/24 Friday <hr />
            10:00 AM - 11:00 AM
          </p>
          <Link to="/psycologist-appointment-form">
            <button
              className={`${styles.bookNowButton}`}
              style={{ fontSize: "18px", color: "#333" }}
            >
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Rest of your code */}
    </div>
  );
};

export default BookNow;
