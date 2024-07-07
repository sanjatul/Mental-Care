import React, { useState } from "react";

function CreateAppointments() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="container mt-2 d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            <b>CREATE APPOINTMENT SCHEDULE</b>
          </h3>
          <hr />
          <div className="row pb-3">
            <div className="col-md-6 pt-3">
              <label htmlFor="startingTime" className="form-label">
                <b>Starting Time</b>
              </label>
              <input className="form-control" type="datetime-local" />
            </div>
            <div className="col-md-6 pt-3">
              <label htmlFor="endingTime" className="form-label">
                <b>Ending Time</b>
              </label>
              <input className="form-control" type="datetime-local" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <label htmlFor="appointmentType" className="form-label">
                <b>Appointment Type:</b>
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="online"
                  name="appointmentType"
                />
                <label className="form-check-label" htmlFor="online">
                  Online
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="offline"
                  name="appointmentType"
                />
                <label className="form-check-label" htmlFor="offline">
                  Offline
                </label>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <button type="button" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointments;
