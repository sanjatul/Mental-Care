import React from "react";
import styles from "./Chat.module.css";
function Message() {
  return (
    <div className={`${styles.message} ${styles.owner}`}>
      <div className={styles.messageInfo}>
        <img src="./images/man.jpg" />
        <spn>Just now</spn>
      </div>
      <div className={styles.messageContent}>
        <p>Hello</p>
        <img src="./images/man.jpg" alt="" />
      </div>
    </div>
  );
}

export default Message;
