import React from "react";
import styles from "./ContainerSection.module.css";

const ContainerSection = () => {
  return (
    <div className={styles.ContainerSection}>
      {" "}
      {/* Apply CSS module */}
      <div>
        <h2>Main Section</h2>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default ContainerSection;
