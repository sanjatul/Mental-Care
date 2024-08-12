import React from "react";
import styles from "./Chat.module.css";
function Search() {
  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input type="text" placeholder="Search User" />
      </div>
      <div className={styles.userChat}>
        <img src="images/man.jpg" alt="img" />
        <div className={styles.userChatInfo}>
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
