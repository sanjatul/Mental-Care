import React from "react";
import DataTable from "react-data-table-component";
function History({ history }) {
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
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "TIME",
      selector: (row) => formatDate(row.startTime),
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
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => messagePatient(row.patientId)}
          >
            Messages
          </button>
        </div>
      ),
    },
  ];

  const messagePatient = (patientId) => {};
  return (
    <div>
      <DataTable
        title={<span style={{ fontWeight: "bold" }}>PREVIOUS RECORDS</span>}
        fixedHeader
        fixedHeaderScrollHeight="400px"
        columns={column}
        data={history}
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default History;
