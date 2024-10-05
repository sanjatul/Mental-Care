import React from "react";
import DataTable from "react-data-table-component";
import styles from "./BookedSchedules.module.css";
import { Link } from "react-router-dom";
function BookedSchedules({ bookedSchedules }) {
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
      name: "PATIENT NAME",
      selector: (row) => row.patientName,
      sortable: true,
    },
    {
      name: "STARTING TIME",
      selector: (row) => formatDate(row.startTime),
      sortable: true,
    },
    {
      name: "ENDING TIME",
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
      name: "CHAT",

      cell: (row) => {
        const isBeforeOrEqualToNow =
          new Date(row.startTime) <= getCurrentTime();
        return (
          <div>
            {isBeforeOrEqualToNow ? (
              <button className="btn btn-primary" disabled>
                Message
              </button>
            ) : (
              <Link
                to={`/messages/${row.patientId}`}
                className="btn btn-primary"
              >
                Message
              </Link>
            )}
          </div>
        );
      },
      cell: (row) => (
        <div>
          <Link to={`/messages/${row.patientId}`} className="btn btn-primary">
            Message
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <DataTable
        title={<span style={{ fontWeight: "bold" }}>BOOKED SCHEDULES</span>}
        fixedHeader
        fixedHeaderScrollHeight="180px"
        columns={column}
        data={bookedSchedules}
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default BookedSchedules;
