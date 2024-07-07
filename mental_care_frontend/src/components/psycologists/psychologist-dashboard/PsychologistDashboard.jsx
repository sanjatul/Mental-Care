import React from "react";
import PsychologistHeroSection from "../psychologist-hero-section/PsychologistHeroSection";
import PsychologistListSection from "../psychologist-list-section/PsychologistListSection";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared-components/Loader/Loader";

function PsychologistDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [clickedButton, setclickedButton] = useState(1);
  const bookedAppointments = useSelector(
    (store) => store.bookedPsychologistAppointments
  );
  const availableAppointments = useSelector(
    (store) => store.availablePsychologistAppointments
  );
  const handleClickedButton = (number) => {
    setclickedButton(number);
  };
  const [availableSchedule, setAvailableSchedule] = useState([]);
  const [bookedSchedules, setBookedSchedules] = useState([]);
  const [hitory, setHitory] = useState([]);
  useEffect(() => {
    if (bookedAppointments.length !== 0) {
      const availableSchedule = availableAppointments.filter(
        (availableAppointment) => {
          const appointmentDate = new Date(availableAppointment.startTime);
          const currentDate = new Date();
          return appointmentDate > currentDate;
        }
      );
      const bookedSchedules = bookedAppointments.filter((bookedAppointment) => {
        const appointmentDate = new Date(bookedAppointment.startTime);
        const currentDate = new Date();
        return appointmentDate > currentDate;
      });
      const hitory = bookedAppointments.filter((bookedAppointment) => {
        const appointmentDate = new Date(bookedAppointment.startTime);
        const currentDate = new Date();
        return appointmentDate < currentDate;
      });
      setAvailableSchedule(availableSchedule);
      setBookedSchedules(bookedSchedules);
      setHitory(hitory);
    }
  }, [bookedAppointments, availableAppointments]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="row pt-3 pb-5">
        <PsychologistHeroSection
          handleClickedButton={handleClickedButton}
          clickedButton={clickedButton}
          hitory={hitory}
          bookedSchedules={bookedSchedules}
          availableSchedule={availableSchedule}
        />
      </div>
      <div className="row">
        <PsychologistListSection
          clickedButton={clickedButton}
          hitory={hitory}
          bookedSchedules={bookedSchedules}
          availableSchedule={availableSchedule}
        />
      </div>
    </div>
  );
}

export default PsychologistDashboard;
