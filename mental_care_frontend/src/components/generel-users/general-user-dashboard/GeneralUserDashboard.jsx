import React from "react";
import GeneralHeroSection from "../general-user-hero-section/GeneralHeroSection";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneralUserListSection from "../General-user-list-section/GeneralUserListSection";
function GeneralUserDashboard() {
  //store
  const authUser = useSelector((store) => store.authUser);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [occurpiedAppointments, setOccurpiedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedButton, setclickedButton] = useState(1);

  useEffect(() => {
    fetch(
      `https://localhost:7254/api/appointments/previous-user-occupied-schedules/${authUser.userId}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const previousAppointmentsFromDb = data.result;
        setPreviousAppointments(previousAppointmentsFromDb);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch(
      `https://localhost:7254/api/appointments/user-occupied-schedules/${authUser.userId}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const occupiedAppointmentsFromDb = data.result;
        setOccurpiedAppointments(occupiedAppointmentsFromDb);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setIsLoading(false);
  }, []);
  const handleClickedButton = (number) => {
    setclickedButton(number);
  };
  return (
    <div>
      <div className="row pt-3 pb-5">
        <GeneralHeroSection
          clickedButton={clickedButton}
          handleClickedButton={handleClickedButton}
          occurpiedAppointments={occurpiedAppointments}
          previousAppointments={previousAppointments}
        />
      </div>

      <GeneralUserListSection
        clickedButton={clickedButton}
        occurpiedAppointments={occurpiedAppointments}
        previousAppointments={previousAppointments}
      />
    </div>
  );
}

export default GeneralUserDashboard;
