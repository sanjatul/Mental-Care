import React from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import styles from "./AvailableSchedules.module.css";
import { availablePsychologistAppointmentsActions } from "../../../store/availablePsychologistAppointmentsSlice";
function AvailableSchedules({ availableSchedule, handleUdated }) {
  const disPatch = useDispatch();
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
          className={`btn me-3 ${
            row.isOnline ? "btn-secondary" : "btn-warning"
          }`}
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
    }).then(async (result) => {
      // Make this callback async
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://localhost:7254/api/appointments/delete-available-schedules/${appointmentId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("response ok", data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Appointment Slot Removed",
              showConfirmButton: false,
              timer: 1500,
            });
            handleUdated();
            disPatch(
              availablePsychologistAppointmentsActions.removeAppointments(
                appointmentId
              )
            );
          } else {
            Swal.fire("Error", "Please try again later");
          }
        } catch (error) {
          Swal.fire("Error", "Please try again later");
          console.error("Error fetching psychologist schedules:", error);
        }
      }
    });
  };

  return (
    <div className="">
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
