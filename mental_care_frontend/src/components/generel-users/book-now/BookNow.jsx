import React from "react";
import styles from "./BookNow.module.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Utility function to format date and time
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const BookNow = ({ handleIsUpdated, availableSlot }) => {
  const authUser = useSelector((store) => store.authUser);
  const navigate = useNavigate();
  const handlebook = async (e) => {
    const user = window.localStorage.getItem("mc_authUser");
    if (user) {
      Swal.fire({
        title: "Payment",
        text: "Make a payment of 1500Tk?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Pay!",
        input: "text", // This adds an input box
        inputPlaceholder: "Enter your card number",
        inputAttributes: {
          maxlength: 16, // Example: Limit card number length
          minlength: 4,
          autocapitalize: "off",
          autocorrect: "off",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const requestBody = {
            appointmentId: availableSlot.appointmentId,
            patientId: authUser.userId,
          };

          try {
            const response = await fetch(
              `https://localhost:7254/api/appointments/book-schedule`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              }
            );

            if (!response.ok) {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500,
              });
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("data", data);
            if (data.isSuccess) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Appointment Confirmed",
                showConfirmButton: false,
                timer: 1500,
              });

              handleIsUpdated();
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oops...",
                text: "Please Try Again",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } catch (error) {
            console.error("Error booking the appointment:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`${styles.card} mt-3`}>
      <div className={`${styles.container} ${styles.doctorProfileContainer}`}>
        <div className={`${styles.centerContent}`}>
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Date: {formatDateTime(availableSlot.startTime)} (
            {availableSlot.isOnline ? "Online" : "Offline"})
            <hr />
            {formatTime(availableSlot.startTime)} -{" "}
            {formatTime(availableSlot.endTime)}
          </p>

          <button
            onClick={handlebook}
            type="button"
            className={`${styles.bookNowButton}`}
            style={{ fontSize: "18px", color: "#333" }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Rest of your code */}
    </div>
  );
};

export default BookNow;
