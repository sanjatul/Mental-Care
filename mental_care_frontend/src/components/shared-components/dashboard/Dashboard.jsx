import React from "react";
import Sidebar from "../sidebar/Sidebar";
import ContainerSection from "../container-section/ContainerSection";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div className={`${styles.dashboard} row no-gutters`}>
      <div className={`col-md-2 ${styles.sidebar}`}>
        <Sidebar />
      </div>
      <div className={`col-md-10 ${styles.containerSection}`}>
        <ContainerSection />
      </div>
    </div>
  );
}

export default Dashboard;
