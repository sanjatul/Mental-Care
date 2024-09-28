import React, { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import Cam from "../../../../public/images/cam.png";
import Add from "../../../../public/images/add.png";
import More from "../../../../public/images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useNavigate, useParams } from "react-router-dom";
function Chat() {
  const { userid } = useParams();
  const navigate = useNavigate();
  const authUser = localStorage.getItem("mc_authUser");
  const parsedAuthUser = JSON.parse(authUser);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    const message = `http://localhost:5173/room/${userid}?roomId=${userid}`;
    const formData = new FormData();
    formData.append("message", message);
    formData.append("receiver", userid);
    formData.append("sender", parsedAuthUser.userId);
    try {
      const response = await fetch(
        "https://localhost:7254/api/Chat/create-message",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7254/api/users/get-general-user/${userid}`, // Use the userid in the API endpoint
          {
            method: "GET",
            headers: {
              accept: "text/plain",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.result); // Set the fetched user data
      } catch (err) {
        setError(err.message); // Set error message if API call fails
      }
    };

    if (userid) {
      fetchUserData(); // Call the function only if userid is available
    }
  }, [userid]);

  const handleVideoCall = async () => {
    sendMessage();
    navigate(`/room/${userid}`);
  };
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        {error ? (
          <span>Error: {error}</span>
        ) : (
          <div className="d-flex align-items-center">
            <span>
              {userData && userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt={`${userData.name}'s profile`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%", // Makes the image round
                    marginRight: "10px", // Adds space between image and name
                  }}
                  className="img-fluid"
                />
              ) : (
                <></>
              )}
            </span>
            <span>{userData ? userData.name : "Loading..."}</span>
          </div>
        )}
        {parsedAuthUser?.role == "psychologist" && (
          <div className={styles.chatIcons}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onClick={handleVideoCall} // Call the function directly
            >
              <img
                src={Cam}
                alt="Camera"
                style={{ height: "30px", width: "40px" }}
              />
            </button>
            {/* <img src={Add} alt="Add" />
          <img src={More} alt="More" /> */}
          </div>
        )}
      </div>

      <Messages receiverId={userid} />
      <Input receiverId={userid} />
    </div>
  );
}

export default Chat;
