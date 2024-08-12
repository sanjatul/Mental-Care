import React from "react";
import styles from "./Chat.module.css";
function Chats() {
  return (
    <div className={styles.chats}>
      {/*Single User */}
      <div className={styles.userChat}>
        <img src="images/man.jpg" alt="img" />
        <div className={styles.userChatInfo}>
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      {/*Single User */}
      {/*Single User */}
      <div className={styles.userChat}>
        <img src="images/man.jpg" alt="img" />
        <div className={styles.userChatInfo}>
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      {/*Single User */}
      {/*Single User */}
      <div className={styles.userChat}>
        <img src="images/man.jpg" alt="img" />
        <div className={styles.userChatInfo}>
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      {/*Single User */}
      {/*Single User */}
      <div className={styles.userChat}>
        <img src="images/man.jpg" alt="img" />
        <div className={styles.userChatInfo}>
          <span>Jane</span>
          <p>Hello</p>
        </div>
      </div>
      {/*Single User */}
    </div>
  );
}

export default Chats;
