// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { availablePsychologistAppointmentsActions } from "../../../store/availablePsychologistAppointmentsSlice";

// function CreateAppointments({
//   handleUdated,
//   bookedSchedules,
//   availableSchedule,
// }) {
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [isOnline, setIsOnline] = useState(1);
//   const dispatch = useDispatch();
//   const storeAuthUser = useSelector((store) => store.authUser);
//   console.log("Booked Schedules", bookedSchedules);
//   console.log("Available schedules", availableSchedule);
//   const handleScheduleCreation = async (e) => {
//     e.preventDefault();

//     const data = {
//       psychologistId: storeAuthUser.userId,
//       startTime: startTime,
//       endTime: endTime,
//       isOnline: isOnline === 1,
//     };

//     try {
//       const response = await fetch(
//         "https://localhost:7254/api/appointments/create-schedules",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();

//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Appointment schedule has been created",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         setStartTime("");
//         setEndTime("");
//         setIsOnline(1);
//         dispatch(
//           availablePsychologistAppointmentsActions.addAppointments(
//             result.result
//           )
//         );
//         handleUdated();
//       } else {
//         Swal.fire({
//           position: "top-end",
//           icon: "error",
//           title: "Please try again",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         position: "top-end",
//         icon: "error",
//         title: "Please try again later",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   // Get the current date and time in the correct format for the min attribute
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm for datetime-local
//   };

//   return (
//     <div className="container mt-2 d-flex justify-content-center">
//       <form onSubmit={handleScheduleCreation}>
//         <div className="card">
//           <div className="card-body">
//             <h3 className="card-title text-center mb-4">
//               <b>CREATE APPOINTMENT SCHEDULE</b>
//             </h3>
//             <hr />
//             <div className="row pb-3">
//               <div className="col-md-6 pt-3">
//                 <label htmlFor="startingTime" className="form-label">
//                   <b>Starting Time</b>
//                 </label>
//                 <input
//                   required
//                   value={startTime}
//                   className="form-control"
//                   type="datetime-local"
//                   min={getCurrentDateTime()} // Prevent selecting past time
//                   onChange={(e) => setStartTime(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-6 pt-3">
//                 <label htmlFor="endingTime" className="form-label">
//                   <b>Ending Time</b>
//                 </label>
//                 <input
//                   required
//                   value={endTime}
//                   className="form-control"
//                   type="datetime-local"
//                   min={startTime} // Ensure end time is after start time
//                   onChange={(e) => setEndTime(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="row mt-3">
//               <div className="col-md-6">
//                 <label htmlFor="appointmentType" className="form-label">
//                   <b>Appointment Type:</b>
//                 </label>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     id="online"
//                     name="appointmentType"
//                     value={1}
//                     checked={isOnline == 1}
//                     onChange={() => setIsOnline(1)}
//                   />
//                   <label className="form-check-label" htmlFor="online">
//                     Online
//                   </label>
//                 </div>
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     id="offline"
//                     value={0}
//                     name="appointmentType"
//                     checked={isOnline == 0}
//                     onChange={() => setIsOnline(0)}
//                   />
//                   <label className="form-check-label" htmlFor="offline">
//                     Offline
//                   </label>
//                 </div>
//               </div>
//               <div className="col-md-6 d-flex justify-content-end align-items-center">
//                 <button type="submit" className="btn btn-primary">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateAppointments;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { availablePsychologistAppointmentsActions } from "../../../store/availablePsychologistAppointmentsSlice";

function CreateAppointments({
  handleUdated,
  bookedSchedules,
  availableSchedule,
}) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isOnline, setIsOnline] = useState(1);
  const dispatch = useDispatch();
  const storeAuthUser = useSelector((store) => store.authUser);

  console.log("Booked Schedules", bookedSchedules);
  console.log("Available schedules", availableSchedule);

  const handleScheduleCreation = async (e) => {
    e.preventDefault();

    const data = {
      psychologistId: storeAuthUser.userId,
      startTime: startTime,
      endTime: endTime,
      isOnline: isOnline === 1,
    };

    try {
      const response = await fetch(
        "https://localhost:7254/api/appointments/create-schedules",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Appointment schedule has been created",
          showConfirmButton: false,
          timer: 1500,
        });

        setStartTime("");
        setEndTime("");
        setIsOnline(1);
        dispatch(
          availablePsychologistAppointmentsActions.addAppointments(
            result.result
          )
        );
        handleUdated();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please try again",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please try again later",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Helper function to convert datetime to a timestamp
  const toTimestamp = (datetime) => new Date(datetime).getTime();

  // Check if selected time is available or booked
  const isConflicting = (startTime, endTime) => {
    const startTs = toTimestamp(startTime);
    const endTs = toTimestamp(endTime);

    const conflictFound = (schedules) => {
      return schedules.some(({ startTime, endTime }) => {
        const scheduleStartTs = toTimestamp(startTime);
        const scheduleEndTs = toTimestamp(endTime);

        // Check if the selected times overlap with any existing schedule
        return (
          (startTs >= scheduleStartTs && startTs < scheduleEndTs) ||
          (endTs > scheduleStartTs && endTs <= scheduleEndTs) ||
          (startTs <= scheduleStartTs && endTs >= scheduleEndTs)
        );
      });
    };

    return conflictFound(bookedSchedules) || conflictFound(availableSchedule);
  };

  // Get the current date and time in the correct format for the min attribute
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm for datetime-local
  };

  // Function to handle changes in startTime and endTime with conflict checking
  const handleStartTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);

    if (isConflicting(value, endTime)) {
      Swal.fire({
        icon: "error",
        title: "Time Conflict",
        text: "The selected start time overlaps with an existing schedule.",
      });
      setStartTime("");
    }
  };

  const handleEndTimeChange = (e) => {
    const value = e.target.value;
    setEndTime(value);

    if (isConflicting(startTime, value)) {
      Swal.fire({
        icon: "error",
        title: "Time Conflict",
        text: "The selected end time overlaps with an existing schedule.",
      });
      setEndTime("");
    }
  };

  return (
    <div className="container mt-2 d-flex justify-content-center">
      <form onSubmit={handleScheduleCreation}>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">
              <b>CREATE APPOINTMENT SCHEDULE</b>
            </h3>
            <hr />
            <div className="row pb-3">
              <div className="col-md-6 pt-3">
                <label htmlFor="startingTime" className="form-label">
                  <b>Starting Time</b>
                </label>
                <input
                  required
                  value={startTime}
                  className="form-control"
                  type="datetime-local"
                  min={getCurrentDateTime()} // Prevent selecting past time
                  onChange={handleStartTimeChange}
                />
              </div>
              <div className="col-md-6 pt-3">
                <label htmlFor="endingTime" className="form-label">
                  <b>Ending Time</b>
                </label>
                <input
                  required
                  value={endTime}
                  className="form-control"
                  type="datetime-local"
                  min={startTime} // Ensure end time is after start time
                  onChange={handleEndTimeChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="appointmentType" className="form-label">
                  <b>Appointment Type:</b>
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="online"
                    name="appointmentType"
                    value={1}
                    checked={isOnline == 1}
                    onChange={() => setIsOnline(1)}
                  />
                  <label className="form-check-label" htmlFor="online">
                    Online
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="offline"
                    value={0}
                    name="appointmentType"
                    checked={isOnline == 0}
                    onChange={() => setIsOnline(0)}
                  />
                  <label className="form-check-label" htmlFor="offline">
                    Offline
                  </label>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAppointments;
