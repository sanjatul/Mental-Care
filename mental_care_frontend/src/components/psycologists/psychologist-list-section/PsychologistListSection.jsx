import React from "react";
import AvailableSchedules from "../available-schedules/AvailableSchedules";
import BookedSchedules from "../booked-schedules/BookedSchedules";
import History from "../../shared-components/history/History";

function PsychologistListSection({ clickedButton,hitory,bookedSchedules,availableSchedule}) {
  return ( 
    <div className="pe-5">
      {clickedButton == 1 && <BookedSchedules bookedSchedules={bookedSchedules}/> }
      {clickedButton == 2 && <AvailableSchedules availableSchedule={availableSchedule}/>}
      {clickedButton == 3 && <History hitory={hitory}/>}
    </div>
  );
}

export default PsychologistListSection;
