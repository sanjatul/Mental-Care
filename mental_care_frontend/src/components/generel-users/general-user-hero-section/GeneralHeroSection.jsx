import React from "react";

function GeneralHeroSection({
  clickedButton,
  handleClickedButton,
  occurpiedAppointments,
  previousAppointments,
}) {
  const getButtonClasses = (value) => {
    if (clickedButton === value) {
      return "btn btn-primary bg-dark text-white";
    } else {
      return "btn btn-primary";
    }
  };
  return (
    <div className="border pt-4 pb-4 pe-4">
      <div className="row justify-content-center">
        <div className="col-sm-6 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>UPCOMING APPOINTMENTS</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{occurpiedAppointments.length}</b> appointments found.
              </p>
              <button
                className={getButtonClasses(1)}
                onClick={() => {
                  handleClickedButton(1);
                }}
              >
                View
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>PREVIOUS APPOINTMENTS</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{previousAppointments.length}</b> appointments found.
              </p>
              <button
                className={getButtonClasses(2)}
                onClick={() => {
                  handleClickedButton(2);
                }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralHeroSection;
