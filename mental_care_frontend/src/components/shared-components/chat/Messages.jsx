// import React, { useEffect, useState } from "react";
// import styles from "./Chat.module.css";
// import Message from "./Message";

// export default function Messages({ receiverId }) {
//   const [messages, setMessages] = useState([]);
//   const [error, setError] = useState(null);
//   const authUser = localStorage.getItem("mc_authUser");
//   const parsedAuthUser = JSON.parse(authUser);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch(
//         "https://localhost:7254/api/Chat/get-messages",
//         {
//           method: "POST",
//           headers: {
//             accept: "*/*",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userOne: parsedAuthUser.userId,
//             userTwo: receiverId,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch messages");
//       }

//       const data = await response.json();
//       // Check if the new messages are different from the current messages
//       if (JSON.stringify(data.result) !== JSON.stringify(messages)) {
//         setMessages(data.result);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     if (parsedAuthUser?.userId && receiverId) {
//       fetchMessages(); // Initial fetch
//       const interval = setInterval(fetchMessages, 2000); // Fetch messages every 3 seconds

//       return () => clearInterval(interval); // Clean up on unmount
//     }
//   }, [parsedAuthUser, receiverId, messages]); // Add messages to dependencies

//   return (
//     <div className={styles.messages}>
//       {error ? (
//         <p>Error loading messages: {error}</p>
//       ) : messages.length > 0 ? (
//         messages.map((message, index) => (
//           <Message key={index} message={message} />
//         ))
//       ) : (
//         <p>No messages found</p>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import styles from "./Chat.module.css";
import Message from "./Message";

export default function Messages({ receiverId }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const authUser = localStorage.getItem("mc_authUser");
  const parsedAuthUser = JSON.parse(authUser);
  const messagesEndRef = useRef(null); // Create a ref to scroll to

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        "https://localhost:7254/api/Chat/get-messages",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userOne: parsedAuthUser.userId,
            userTwo: receiverId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      // Check if the new messages are different from the current messages
      if (JSON.stringify(data.result) !== JSON.stringify(messages)) {
        setMessages(data.result);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (parsedAuthUser?.userId && receiverId) {
      fetchMessages(); // Initial fetch
      const interval = setInterval(fetchMessages, 2000); // Fetch messages every 2 seconds

      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [parsedAuthUser, receiverId]);

  // Effect to scroll to the bottom when messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <div className={styles.messages}>
      {error ? (
        <p>Error loading messages: {error}</p>
      ) : messages.length > 0 ? (
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))
      ) : (
        <p>No messages found</p>
      )}
      {/* Empty div to act as a scroll target */}
      <div ref={messagesEndRef} />
    </div>
  );
}
