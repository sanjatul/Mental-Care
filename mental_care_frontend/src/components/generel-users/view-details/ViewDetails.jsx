import React, { useEffect, useState } from "react";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loader from "../../shared-components/Loader/Loader";
import AppointmentSchedule from "../appointment-schedule/AppointmentSchedule";
import PsycholgistProfile from "../psycholgist-profile/PsycholgistProfile";
function ViewDetails() {
  const { userid } = useParams();
  const [psychologist, setPsyChologist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`https://localhost:7254/api/users/get-psychologist/${userid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const psychologistData = data.result;
        console.log(psychologistData[0]);
        setPsyChologist(psychologistData[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container pt-3">
      <PsycholgistProfile psychologist={psychologist} />
      <AppointmentSchedule userid={userid} />
    </div>
  );
}

export default ViewDetails;
