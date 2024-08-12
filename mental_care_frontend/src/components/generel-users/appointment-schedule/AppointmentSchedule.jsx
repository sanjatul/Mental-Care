import React, { useEffect, useState } from "react";
import BookNow from "../book-now/BookNow";
function AppointmentSchedule({ userid, slots }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const handleIsUpdated = () => {
    setIsUpdated(!isUpdated);
  };
  useEffect(() => {
    const fetchPsychologistSchedules = async () => {
      //Available schedules
      try {
        const response = await fetch(
          `https://localhost:7254/api/appointments/available-schedules/${userid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setAvailableSlots(data.result);
        } else {
          console.error(
            "Failed to fetch psychologist schedules:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching psychologist schedules:", error);
      }
    };

    fetchPsychologistSchedules();
  }, [isUpdated]);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h3 className="pt-2">
          <b>{slots} SCHEDULES</b>
          <hr />
        </h3>
      </div>

      <div
        className="container"
        style={{
          maxHeight: "430px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {availableSlots.map((availableSlot, index) => (
            <div key={index} className="col">
              <BookNow userid={userid} handleIsUpdated={handleIsUpdated} availableSlot={availableSlot} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AppointmentSchedule;
