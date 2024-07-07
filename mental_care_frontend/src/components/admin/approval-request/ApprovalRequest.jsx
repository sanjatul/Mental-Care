import React from "react";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { psychologistDetailsActions } from "../../../store/psychologistDetailsSlice";
function ApprovalRequest() {
  const psychologists = useSelector((store) => store.psychologistDetails);
  const disPatch = useDispatch();
  const [approvalRequest, setApprovalRequest] = useState([]);
  const [psychologist, setPsychologist] = useState([]);
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
            data-bs-toggle="modal"
            data-bs-target="#approvalModal"
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
            Approve
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleRemovePsychologist(row.userId)}
          >
            Decline
          </button>
        </div>
      ),
    },
  ];
  const handleViewDetails = (userId) => {
    const user = approvalRequest.filter((user) => user.userId === userId);
    setPsychologist(user);
  };
  const handleRemovePsychologist = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Decline!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://localhost:7254/api/users/delete-psychologist/${userId}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to decline request");
            }
            return res.json();
          })
          .then((data) => {
            disPatch(
              psychologistDetailsActions.ApprovalRequest({ userId: userId })
            );
            Swal.fire({
              title: "Declined!",
              text: "Request has been declined.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to decline request");
          });
      }
    });
  };
  const handleApprovePsychologist = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://localhost:7254/api/users/approve-psychologist/${userId}`,
          {
            method: "PUT",
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to approve psychologist");
            }
            return res.json();
          })
          .then((data) => {
            disPatch(
              psychologistDetailsActions.removePsychologist({ userId: userId })
            );
            Swal.fire({
              title: "Approved!",
              text: "Request has been approved.",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to approve request");
          });
      }
    });
  };

  return (
    <div>
      <DataTable
        title={
          <span style={{ fontWeight: "bold" }}>
            PSYCHOLOGIST APPROVAL REQUEST LIST
          </span>
        }
        fixedHeader
        fixedHeaderScrollHeight="400px"
        columns={column}
        data={approvalRequest}
        highlightOnHover
        pagination
      />
      <div
        className="modal fade"
        id="approvalModal"
        tabindex="-1"
        aria-labelledby="approvalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="approvalModalLabel">
                PSYCHOLOGIST'S DETAILS
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card text-center">
                {psychologist.length > 0 && psychologist[0].profilePicture ? (
                  <img
                    src={psychologist[0].profilePicture}
                    className="card-img-top"
                    style={{ height: "370px" }}
                    alt="..."
                  />
                ) : (
                  <div>No profile picture available</div>
                )}
                <div className="card-body">
                  <diV className="row">
                    <></>
                  </diV>
                  <h4 className="card-title">
                    Name:{" "}
                    {psychologist.length > 0 && psychologist[0].name
                      ? psychologist[0].name
                      : "Name"}
                  </h4>
                  <h5>
                    Email:{" "}
                    {psychologist.length > 0 && psychologist[0].email
                      ? psychologist[0].email
                      : "Email"}
                  </h5>
                  <h5>
                    Contact Number:{" "}
                    {psychologist.length > 0 && psychologist[0].phoneNumber
                      ? psychologist[0].phoneNumber
                      : "Contact Number"}
                  </h5>
                  <h5>
                    Gender:{" "}
                    {psychologist.length > 0 && psychologist[0].gender
                      ? psychologist[0].gender
                      : "Gender"}
                  </h5>
                  <h5>
                    Age:{" "}
                    {psychologist.length > 0 && psychologist[0].age
                      ? psychologist[0].age
                      : "Age"}
                  </h5>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalRequest;
