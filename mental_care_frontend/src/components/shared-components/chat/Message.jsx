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

  // Regex pattern to match the specified URL format
  const urlPattern = /^http:\/\/localhost:5173\/room\/([^\/?]+)\?roomId=\1$/;

  const renderMessageContent = () => {
    if (message.message) {
      // Check if message.message matches the URL pattern
      if (urlPattern.test(message.message)) {
        return (
          <a href={message.message} target="_self" rel="noopener noreferrer">
            <button className="p-2 btn btn-primary">
              <i class="bi bi-camera-video-fill"></i> Join Call
            </button>
          </a>
        );
      } else {
        return <p>{message.message}</p>;
      }
    } else if (message.documentLink) {
      if (
        message.documentLink.endsWith(".jpg") ||
        message.documentLink.endsWith(".jpeg") ||
        message.documentLink.endsWith(".png")
      ) {
        return (
          <img
            src={message.documentLink}
            alt="Document"
            className={styles.documentImage}
          />
        );
      } else {
        return (
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
        );
      }
    }
    return null;
  };

  return (
    <div className={`${styles.message} ${isOwner ? styles.owner : ""}`}>
      <div className={styles.messageInfo}>
        <img src={message.profilePicture || "./images/man.jpg"} alt="Profile" />
        <span>{new Date(message.sentAt).toLocaleTimeString()}</span>
      </div>
      <div className={styles.messageContent}>{renderMessageContent()}</div>
    </div>
  );
}

export default Message;
