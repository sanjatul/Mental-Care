import React from "react";
import UserProfile from "../../generel-users/profile/UserProfile";
import PsychologistProfile from "../../psycologists/profile/PsychologistProfile";
import { useSelector } from "react-redux";
function ProfileSetting() {
  const authUser = useSelector((store) => store.authUser);
  return <>
   {authUser &&
        Object.keys(authUser).length > 0 &&
        authUser.role == "admin" && <UserProfile/>}
      {authUser &&
        Object.keys(authUser).length > 0 &&
        authUser.role == "user" && <UserProfile/>}
      {authUser &&
        Object.keys(authUser).length > 0 &&
        authUser.role == "psychologist" && <PsychologistProfile/>}
  
  
  </>;
}

export default ProfileSetting;
