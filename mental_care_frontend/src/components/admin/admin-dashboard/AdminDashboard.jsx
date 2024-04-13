import React from "react";
import AdminHeroSection from "../admin-hero-section/AdminHeroSection";
import AdminListSection from "../admin-list-section/AdminListSection";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { psychologistDetailsActions } from "../../../store/psychologistDetailsSlice";
import Loader from "../../shared-components/Loader/Loader";
import { generalUsersDetailsActions } from "../../../store/generalUsersDetailsSlice";

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologistDetails);
  const generalUsers = useSelector((store) => store.generalUsersDetails);
  useEffect(() => {
    if (psychologists.length == 0) {
      fetch("https://localhost:7254/api/users/get-psychologists")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const psychologistData = data.result;
          dispatch(
            psychologistDetailsActions.addPsychologists(psychologistData)
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    fetch("https://localhost:7254/api/users/get-general-users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const generalUsersData = data.result;
        dispatch(generalUsersDetailsActions.addGeneralUsers(generalUsersData));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [generalUsers, psychologists]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="row pt-3 pb-5">
        <AdminHeroSection
          psychologistList={psychologists}
          generalUsers={generalUsers}
        />
      </div>
      <div className="row">
        <AdminListSection />
      </div>
    </div>
  );
}

export default AdminDashboard;
