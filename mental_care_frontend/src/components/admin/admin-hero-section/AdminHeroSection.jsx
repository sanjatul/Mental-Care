import React, { useEffect, useState } from "react";

function AdminHeroSection({
  psychologistList,
  generalUsers,
  clickedButton,
  handleClickedButton,
}) {
  const [numberOfApprovalRequest, setNumberOfApprovalRequest] = useState(0);
  const [numberOfPsychologist, setNumberOfPsychologist] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  useEffect(() => {
    if (psychologistList.length !== 0) {
      const notApprovedPsychologists = psychologistList.filter(
        (psychologist) => !psychologist.isApproved
      );
      const approvedPsychologists = psychologistList.filter(
        (psychologist) => psychologist.isApproved
      );
      setNumberOfApprovalRequest(notApprovedPsychologists.length);
      setNumberOfPsychologist(approvedPsychologists.length);
      setNumberOfUsers(generalUsers.length);
    }
  }, [psychologistList, generalUsers]);
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
        <div className="col-sm-4 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>APPROVAL REQUESTS</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{numberOfApprovalRequest}</b> psychologist's request for
                approval is pending
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
        <div className="col-sm-4 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>PSYCHOLOGISTS LIST</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{numberOfPsychologist}</b> psychologists found
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
        <div className="col-sm-4 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>USERS LIST</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{numberOfUsers}</b> users found
              </p>
              <button
                className={getButtonClasses(3)}
                onClick={() => {
                  handleClickedButton(3);
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

export default AdminHeroSection;
