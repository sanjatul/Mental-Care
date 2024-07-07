import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
function AvailableSchedules({ availableSchedule }) {
  //Method to format time string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short", // 'long' for full weekday name
      year: "numeric",
      month: "short", // 'long' for full month name
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // true for 12-hour time, false for 24-hour time
    });
  };

  const column = [
    {
      name: "Starting Time",
      selector: (row) => formatDate(row.startTime),
      sortable: true,
    },
    {
      name: "Ending Time",
      selector: (row) => formatDate(row.endTime),
      sortable: true,
    },
    {
      name: "MEDIUM",
      selector: (row) => (
        <button
          className={`btn me-3 ${row.isOnline ? "btn-secondary" : "btn-warning"}`}
        >
          {row.isOnline ? "Online" : "Offline"}
        </button>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveSchedule(row.appointmentId)}
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  const handleRemoveSchedule = (appointmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
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
  return (
    <div>
      <DataTable
        title={<span style={{ fontWeight: "bold" }}>AVAILABLE SCHEDULES</span>}
        fixedHeader
        fixedHeaderScrollHeight="400px"
        columns={column}
        data={availableSchedule}
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default AvailableSchedules;
