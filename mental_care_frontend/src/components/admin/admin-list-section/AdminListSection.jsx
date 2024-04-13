import React from "react";
import ApprovalRequest from "../approval-request/ApprovalRequest";
import PsychologistList from "../psychologist-list/PsychologistList";
import UsersList from "../user-list/UsersList";
function AdminListSection() {
  return (
    <>
      <ApprovalRequest />
      <PsychologistList />
      <UsersList />
    </>
  );
}

export default AdminListSection;
