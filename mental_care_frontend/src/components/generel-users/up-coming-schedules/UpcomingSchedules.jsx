// import React from "react";
// import DataTable from "react-data-table-component";
// import { Link } from "react-router-dom";

// function UpcomingSchedules({ occurpiedAppointments }) {
//   // Method to format time string
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//   };

//   // Get the current time
//   const getCurrentTime = () => new Date();

//   const column = [
//     {
//       name: "PSYCHOLOGIST NAME",
//       selector: (row) => row.psychologistName,
//       sortable: true,
//     },
//     {
//       name: "STARTING TIME",
//       selector: (row) => formatDate(row.startTime),
//       sortable: true,
//     },
//     {
//       name: "ENDING TIME",
//       selector: (row) => formatDate(row.endTime),
//       sortable: true,
//     },
//     {
//       name: "MEDIUM",
//       selector: (row) => (
//         <button
//           className={`btn me-3 ${
//             row.isOnline ? "btn-secondary" : "btn-warning"
//           }`}
//         >
//           {row.isOnline ? "Online" : "Offline"}
//         </button>
//       ),
//       sortable: true,
//     },
//     {
//       name: "CHAT",
//       cell: (row) => {
//         const isBeforeOrEqualToNow = new Date(row.startTime) > getCurrentTime();
//         return (
//           <div>
//             {isBeforeOrEqualToNow ? (
//               <button className="btn btn-primary" disabled>
//                 Message
//               </button>
//             ) : (
//               <Link
//                 to={`/messages/${row.psychologistId}`}
//                 className="btn btn-primary"
//               >
//                 Message
//               </Link>
//             )}
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="">
//       <DataTable
//         title={
//           <span style={{ fontWeight: "bold" }}>UPCOMING APPOINTMENTS</span>
//         }
//         fixedHeader
//         fixedHeaderScrollHeight="400px"
//         columns={column}
//         data={occurpiedAppointments}
//         highlightOnHover
//         pagination
//       />
//     </div>
//   );
// }

// export default UpcomingSchedules;

import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function UpcomingSchedules({ occurpiedAppointments }) {
  // Method to format time string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Get the current time
  const getCurrentTime = () => new Date();

  // Sort appointments by start time (ascending order)
  const sortedAppointments = [...occurpiedAppointments].sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );

  const column = [
    {
      name: "PSYCHOLOGIST NAME",
      selector: (row) => row.psychologistName,
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
                to={`/messages/${row.psychologistId}`}
                className="btn btn-primary"
              >
                Message
              </Link>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <DataTable
        title={
          <span style={{ fontWeight: "bold" }}>UPCOMING APPOINTMENTS</span>
        }
        fixedHeader
        fixedHeaderScrollHeight="400px"
        columns={column}
        data={sortedAppointments} // Use the sorted appointments
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default UpcomingSchedules;
