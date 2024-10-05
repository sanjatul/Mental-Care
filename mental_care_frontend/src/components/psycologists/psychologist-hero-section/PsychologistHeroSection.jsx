import React from "react";
import CreateAppointments from "../create-appointments/CreateAppointments";

function PsychologistHeroSection({
  availableSchedule,
  history,
  bookedSchedules,
  clickedButton,
  handleClickedButton,
  handleUdated,
}) {
  const getButtonClasses = (value) => {
    if (clickedButton === value) {
      return "btn btn-primary bg-dark text-white";
    } else {
      return "btn btn-primary";
    }
  };
  return (
    <div className="border pt-3 pb-1 pe-4">
      <div className="row justify-content-center">
        <div className="col-sm-3 mb-3 pt-5">
          <div className="card text-center mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                <b>AVAILABLE SCHEDULES</b>
              </h6>{" "}
              <button
                className={getButtonClasses(2)}
                onClick={() => {
                  handleClickedButton(2);
                }}
              >
                View{" "}
                <span className="badge rounded-circle border  border-2 border-white ms-1 p-1">
                  <b>{availableSchedule.length}</b>
                </span>
              </button>
            </div>
          </div>

          <div className="card text-center mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6>
                <b>BOOKED SCHEDULES</b>
              </h6>{" "}
              <button
                className={getButtonClasses(1)}
                onClick={() => {
                  handleClickedButton(1);
                }}
              >
                View{" "}
                <span className="badge rounded-circle border  border-2 border-white ms-1 p-1">
                  <b>{bookedSchedules.length}</b>
                </span>
              </button>
            </div>
          </div>

          <div className="card text-center">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6>
                <b>PREVIOUS RECORDS</b>
              </h6>{" "}
              <button
                className={getButtonClasses(3)}
                onClick={() => {
                  handleClickedButton(3);
                }}
              >
                View{" "}
                <span className="badge rounded-circle border  border-2 border-white ms-1 p-1">
                  <b>{history.length}</b>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-sm-9">
          <CreateAppointments
            handleUdated={handleUdated}
            availableSchedule={availableSchedule}
            bookedSchedules={bookedSchedules}
          />
        </div>
      </div>
    </div>
  );
}

export default PsychologistHeroSection;
