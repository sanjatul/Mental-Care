import React from "react";
import BookNow from "../book-now/BookNow";

function AppointmentSchedule() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
        <div className="col-4">
          <BookNow />
        </div>
      </div>
    </div>
  );
}

export default AppointmentSchedule;
