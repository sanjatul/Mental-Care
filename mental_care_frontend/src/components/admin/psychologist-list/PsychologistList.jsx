import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function PsychologistList() {
  const psychologists = useSelector((store) => store.psychologistDetails);
  const [psychologistsDetails, setPsychologistsDetails] = useState([]);
  useEffect(() => {
    if (psychologists.length !== 0) {
      const approvedPsychologists = psychologists.filter(
        (psychologist) => psychologist.isApproved
      );
      setPsychologistsDetails(approvedPsychologists);
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
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary me-3"
            onClick={() => handleViewPsychologist(row.userId)}
          >
            View Details
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
  const handleViewPsychologist = (userId) => {
    console.log(userId);
  };
  const handleRemovePsychologist = (userId) => {
    console.log(userId);
  };
  return (
    <div>
      <DataTable
        title="Psychologist List"
        fixedHeader
        fixedHeaderScrollHeight="400px"
        columns={column}
        data={psychologistsDetails}
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default PsychologistList;
