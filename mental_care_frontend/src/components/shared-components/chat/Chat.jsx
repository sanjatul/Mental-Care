import React from "react";
import styles from "./Chat.module.css";
import Cam from "../../../../public/images/cam.png";
import Add from "../../../../public/images/add.png";
import More from "../../../../public/images/more.png";
import Messages from "./Messages";
import Input from "./Input";
function Chat() {
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>Jane</span>
        <div className={styles.chatIcons}>
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
