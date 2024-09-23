import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import styles from "./Chat.module.css";
import { useParams } from "react-router-dom";
function ChatLayeout() {
  return (
    <div className={styles.home}>
      <div className={styles.chatContainer}>
        {/* <Sidebar /> */}
        <Chat />
      </div>
    </div>
  );
}

export default ChatLayeout;
