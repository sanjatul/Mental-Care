import React from "react";
import styles from "./BookNow.module.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const BookNow = ({ handleIsUpdated, availableSlot }) => {
  const authUser = useSelector((store) => store.authUser);
  const handlebook = async (e) => {
    Swal.fire({
      title: "Payment",
      text: "Make a payment of 1500Tk?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Pay!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestBody = {
          appointmentId: availableSlot.appointmentId,
          patientId: authUser.userId,
        };

        try {
          const response = fetch(
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
            throw new Error(
              `HTTP error! Status: ${response.status}, ${errorMessage}`
            );
          }

          const data = response.json();
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
          console.error("Error adding education:", error);
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
  };
  return (
    <div className={`${styles.card} mt-3`}>
      <div className={`${styles.container} ${styles.doctorProfileContainer}`}>
        <div className={`${styles.centerContent}`}>
          <p style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Date : 23/03/24 Friday (
            {availableSlot.isOnline ? "Online" : "Offline"})
            <hr />
            10:00 AM - 11:00 AM
          </p>

          <button
            onClick={() => handlebook()}
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
