import React from "react";
import AvailableSchedules from "../available-schedules/AvailableSchedules";
import BookedSchedules from "../booked-schedules/BookedSchedules";
import History from "../../shared-components/history/History";

function PsychologistListSection({
  clickedButton,
  history,
  bookedSchedules,
  availableSchedule,
  handleUdated,
}) {
  return (
    <div className="pe-5">
      {clickedButton == 1 && (
        <BookedSchedules bookedSchedules={bookedSchedules} />
      )}
      {clickedButton == 2 && (
        <AvailableSchedules
          availableSchedule={availableSchedule}
          handleUdated={handleUdated}
        />
      )}
      {clickedButton == 3 && <History history={history} />}
    </div>
  );
}

export default PsychologistListSection;
