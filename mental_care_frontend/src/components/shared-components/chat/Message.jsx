import React from "react";
import styles from "./Chat.module.css";

function Message({ message }) {
  const authUser = localStorage.getItem("mc_authUser");
  const parsedAuthUser = JSON.parse(authUser);
  const isOwner = message.senderId === parsedAuthUser.userId;

  // Extract the file name from the document link
  const getFileName = (url) => {
    return url.split("/").pop();
  };

  return (
    <div className={`${styles.message} ${isOwner ? styles.owner : ""}`}>
      <div className={styles.messageInfo}>
        <img src={message.profilePicture || "./images/man.jpg"} alt="Profile" />
        <span>{new Date(message.sentAt).toLocaleTimeString()}</span>
      </div>
      <div className={styles.messageContent}>
        {message.message ? (
          <p>{message.message}</p>
        ) : message.documentLink ? (
          message.documentLink.endsWith(".jpg") ||
          message.documentLink.endsWith(".jpeg") ||
          message.documentLink.endsWith(".png") ? (
            <img
              src={message.documentLink}
              alt="Document"
              className={styles.documentImage}
            />
          ) : (
            <div className={styles.documentContainer}>
              <a
                href={message.documentLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.documentLink}
              >
                {getFileName(message.documentLink)}
              </a>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default Message;
