import React from "react";
import styles from "./Chat.module.css";
import Search from "./Search";
import Chats from "./Chats";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Search />
      <Chats/>
    </div>
  );
}

export default Sidebar;
