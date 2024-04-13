import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function ApprovalRequest() {
  const psychologists = useSelector((store) => store.psychologistDetails);
  const [approvalRequest, setApprovalRequest] = useState([]);
  useEffect(() => {
    if (psychologists.length !== 0) {
      const notApprovedPsychologists = psychologists.filter(
        (psychologist) => !psychologist.isApproved
      );
      setApprovalRequest(notApprovedPsychologists);
    }
  }, [psychologists]);
  const column = [
    {
      name: "Profile",
      selector: (row) => (
        <img
          width={70}
          height={70}
          style={{ borderRadius: "50%" }}
          src={row.profilePicture}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary me-3"
            onClick={() => handleViewDetails(row.userId)}
          >
            View Details
          </button>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-success me-3"
            onClick={() => handleApprovePsychologist(row.userId)}
          >
            Remove
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleRemovePsychologist(row.userId)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];
  const handleViewDetails = (userId) => {
    console.log(userId);
  };
  const handleRemovePsychologist = (userId) => {
    console.log(userId);
  };
  const handleApprovePsychologist = (userId) => {
    console.log(userId);
  };

  return (
    <div>
      <DataTable
        title="Psychologist Approval Requests"
        fixedHeader
        fixedHeaderScrollHeight="400px"
        columns={column}
        data={approvalRequest}
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default ApprovalRequest;
