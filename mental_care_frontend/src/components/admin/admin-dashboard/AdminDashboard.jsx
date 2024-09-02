// import React from "react";
// import AdminHeroSection from "../admin-hero-section/AdminHeroSection";
// import AdminListSection from "../admin-list-section/AdminListSection";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { psychologistDetailsActions } from "../../../store/psychologistDetailsSlice";
// import Loader from "../../shared-components/Loader/Loader";
// import { generalUsersDetailsActions } from "../../../store/generalUsersDetailsSlice";

// function AdminDashboard() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [clickedButton, setclickedButton] = useState(1);
//   const dispatch = useDispatch();
//   const psychologists = useSelector((store) => store.psychologistDetails);
//   const generalUsers = useSelector((store) => store.generalUsersDetails);
//   const handleClickedButton = (number) => {
//     setclickedButton(number);
//   };
//   useEffect(() => {
//     if (psychologists.length == 0) {
//       fetch("https://localhost:7254/api/users/get-psychologists")
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           const psychologistData = data.result;
//           dispatch(
//             psychologistDetailsActions.addPsychologists(psychologistData)
//           );
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//     fetch("https://localhost:7254/api/users/get-general-users")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         const generalUsersData = data.result;
//         dispatch(generalUsersDetailsActions.addGeneralUsers(generalUsersData));
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [generalUsers, psychologists]);
//   if (isLoading) {
//     return <Loader />;
//   }
//   return (
//     <div>
//       <div className="row pt-3 pb-5">
//         <AdminHeroSection
//           handleClickedButton={handleClickedButton}
//           clickedButton={clickedButton}
//           psychologistList={psychologists}
//           generalUsers={generalUsers}
//         />
//       </div>
//       <div className="row">
//         <AdminListSection clickedButton={clickedButton} />
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import AdminHeroSection from "../admin-hero-section/AdminHeroSection";
import AdminListSection from "../admin-list-section/AdminListSection";
import { useDispatch, useSelector } from "react-redux";
import { psychologistDetailsActions } from "../../../store/psychologistDetailsSlice";
import Loader from "../../shared-components/Loader/Loader";
import { generalUsersDetailsActions } from "../../../store/generalUsersDetailsSlice";

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [clickedButton, setClickedButton] = useState(1);
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologistDetails);
  const generalUsers = useSelector((store) => store.generalUsersDetails);

  const handleClickedButton = (number) => {
    setClickedButton(number);
  };
  useEffect(() => {
    // Check if psychologists data is already loaded to avoid re-fetching

    fetch("https://localhost:7254/api/users/get-psychologists")
      .then((res) => res.json())
      .then((data) => {
        const psychologistData = data.result;
        dispatch(psychologistDetailsActions.addPsychologists(psychologistData));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching psychologists data:", error);
      });

    // Check if general users data is already loaded to avoid re-fetching

    fetch("https://localhost:7254/api/users/get-general-users")
      .then((res) => res.json())
      .then((data) => {
        const generalUsersData = data.result;
        dispatch(generalUsersDetailsActions.addGeneralUsers(generalUsersData));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching general users data:", error);
      });

    // Only set loading to false if both datasets are loaded
    if (psychologists.length > 0 && generalUsers.length > 0) {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetch("https://localhost:7254/api/users/get-psychologists")
      .then((res) => res.json())
      .then((data) => {
        const psychologistData = data.result;
        dispatch(psychologistDetailsActions.addPsychologists(psychologistData));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching psychologists data:", error);
      });

    fetch("https://localhost:7254/api/users/get-general-users")
      .then((res) => res.json())
      .then((data) => {
        const generalUsersData = data.result;
        dispatch(generalUsersDetailsActions.addGeneralUsers(generalUsersData));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching general users data:", error);
      });

    // Only set loading to false if both datasets are loaded
    if (psychologists.length > 0 && generalUsers.length > 0) {
      setIsLoading(false);
    }
  }, [psychologists.length, generalUsers.length, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="row pt-3 pb-5">
        <AdminHeroSection
          handleClickedButton={handleClickedButton}
          clickedButton={clickedButton}
          psychologistList={psychologists}
          generalUsers={generalUsers}
        />
      </div>
      <div className="row">
        <AdminListSection clickedButton={clickedButton} />
      </div>
    </div>
  );
}

export default AdminDashboard;
