import React from "react";
import UpcomingSchedules from "../up-coming-schedules/UpcomingSchedules";
import PreviousAppointments from "../previous-appointments/PreviousAppointments";

function GeneralUserListSection({
  clickedButton,
  occurpiedAppointments,
  previousAppointments,
}) {
  return (
    <div className="pe-5">
      {clickedButton == 1 && (
        <UpcomingSchedules occurpiedAppointments={occurpiedAppointments} />
      )}
      {clickedButton == 2 && (
        <PreviousAppointments history={previousAppointments} />
      )}
    </div>
  );
}

export default GeneralUserListSection;
