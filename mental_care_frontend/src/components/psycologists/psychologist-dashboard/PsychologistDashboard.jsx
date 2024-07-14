import React from "react";
import PsychologistHeroSection from "../psychologist-hero-section/PsychologistHeroSection";
import PsychologistListSection from "../psychologist-list-section/PsychologistListSection";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../shared-components/Loader/Loader";
import { availablePsychologistAppointmentsActions } from "../../../store/availablePsychologistAppointmentsSlice";
import { bookedPsychologistAppointmentsActions } from "../../../store/bookedPsychologistAppointmentsSlice";
import { historyPsychologistAppointmentsActions } from "../../../store/historyPsychologistAppointmentsSlice";
function PsychologistDashboard() {
  //store
  const authUser = useSelector((store) => store.authUser);
  const bookedAppointmentsStore = useSelector(
    (store) => store.bookedPsychologistAppointments
  );
  const availableAppointmentsStore = useSelector(
    (store) => store.availablePsychologistAppointments
  );
  const historyAppointmentsStore = useSelector(
    (store) => store.historyPsychologistAppointments
  );
  //state
  const [isLoading, setIsLoading] = useState(false);
  const [clickedButton, setclickedButton] = useState(1);
  const [availableSchedule, setAvailableSchedule] = useState(
    availableAppointmentsStore
  );
  const [bookedSchedules, setBookedSchedules] = useState(
    bookedAppointmentsStore
  );
  const [history, setHitory] = useState(historyAppointmentsStore);
  const [updated, setUpdated] = useState(true);
  const handleUdated = () => {
    console.log("Value of update", updated);
    setUpdated(!updated);
    console.log("Value of update", updated);
  };
  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchPsychologistSchedules = async () => {
      //Available schedules
      try {
        const response = await fetch(
          `https://localhost:7254/api/appointments/available-schedules/${authUser.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(
            availablePsychologistAppointmentsActions.addAppointments(
              data.result
            )
          );
        } else {
          console.error(
            "Failed to fetch psychologist schedules:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching psychologist schedules:", error);
      }
      //Booked schedules
      try {
        const response = await fetch(
          `https://localhost:7254/api/appointments/occupied-schedules/${authUser.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(
            bookedPsychologistAppointmentsActions.addAppointments(data.result)
          );
        } else {
          console.error(
            "Failed to fetch psychologist schedules:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching psychologist schedules:", error);
      }

      //History schedules
      try {
        const response = await fetch(
          `https://localhost:7254/api/appointments/previous-psychologist-occupied-schedules/${authUser.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(
            historyPsychologistAppointmentsActions.addAppointments(data.result)
          );
        } else {
          console.error(
            "Failed to fetch psychologist schedules:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching psychologist schedules:", error);
      }
    };

    fetchPsychologistSchedules();

    setAvailableSchedule(availableAppointmentsStore);
    setBookedSchedules(bookedAppointmentsStore);
    setHitory(historyAppointmentsStore);
    console.log("use effect in action");
    setIsLoading(false);
  }, [clickedButton, availableSchedule, bookedSchedules, history, updated]);

  const handleClickedButton = (number) => {
    setclickedButton(number);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="row pt-1 pb-2">
        <PsychologistHeroSection
          handleClickedButton={handleClickedButton}
          clickedButton={clickedButton}
          history={historyAppointmentsStore}
          bookedSchedules={bookedAppointmentsStore}
          availableSchedule={availableAppointmentsStore}
          handleUdated={handleUdated}
        />
      </div>
      <div className="row">
        <PsychologistListSection
          clickedButton={clickedButton}
          history={historyAppointmentsStore}
          bookedSchedules={bookedAppointmentsStore}
          availableSchedule={availableAppointmentsStore}
          handleUdated={handleUdated}
        />
      </div>
    </div>
  );
}

export default PsychologistDashboard;
