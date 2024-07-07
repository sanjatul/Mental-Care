import styles from "./Dashboard.module.css";
import AdminDashboard from "../../admin/admin-dashboard/AdminDashboard";
import { useSelector } from "react-redux";
import PsychologistDashboard from "../../psycologists/psychologist-dashboard/PsychologistDashboard";
function Dashboard() {
  const authUser = useSelector((store) => store.authUser);

  return (
    <div>
      {authUser &&
        Object.keys(authUser).length > 0 &&
        authUser.role == "admin" && <AdminDashboard />}
      {authUser &&
        Object.keys(authUser).length > 0 &&
        authUser.role == "user" && <AdminDashboard />}
      {authUser &&
        Object.keys(authUser).length > 0 &&
        authUser.role == "psychologist" && <PsychologistDashboard />}
    </div>
  );
}

export default Dashboard;
