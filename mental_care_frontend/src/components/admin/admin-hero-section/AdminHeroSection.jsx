import React, { useEffect, useState } from "react";

function AdminHeroSection({ psychologistList, generalUsers }) {
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
  return (
    <div className="border pt-4 pb-4">
      <div className="row justify-content-center">
        <div className="col-sm-4 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>Approval Request</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{numberOfApprovalRequest}</b> psychologist's request for
                approval is pending
              </p>
              <a href="#" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>Psychologist List</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{numberOfPsychologist}</b> psychologists found
              </p>
              <a href="#" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card text-center">
            <div className="card-header">
              <h5>User List</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                <b>{numberOfUsers}</b> users found
              </p>
              <a href="#" className="btn btn-primary">
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeroSection;
