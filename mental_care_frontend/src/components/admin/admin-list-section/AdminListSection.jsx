import React from "react";
import ApprovalRequest from "../approval-request/ApprovalRequest";
import PsychologistList from "../psychologist-list/PsychologistList";
import UsersList from "../user-list/UsersList";
function AdminListSection({ clickedButton }) {
  return (
    <div className="pe-5">
      {clickedButton == 1 && <PsychologistList />}
      {clickedButton == 2 && <ApprovalRequest />}
      {clickedButton == 3 && <UsersList />}
    </div>
  );
}

export default AdminListSection;
