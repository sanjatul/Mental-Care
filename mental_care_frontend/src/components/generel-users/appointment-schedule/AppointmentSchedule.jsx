import React from "react";
import BookNow from "../book-now/BookNow";

function AppointmentSchedule({ userid }) {
  let schedules = [{}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h3 className="pt-2">AVAILABLE SCHEDULES</h3>
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
          {schedules.map((schedule, index) => (
            <div key={index} className="col">
              <BookNow />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AppointmentSchedule;
