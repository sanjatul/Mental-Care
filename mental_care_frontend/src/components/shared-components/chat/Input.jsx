// import React, { useState } from "react";
// import styles from "./Chat.module.css";
// import Img from "../../../../public/images/img.png";
// import Attach from "../../../../public/images/attach.png";

// function Input({ receiverId }) {
//   const authUser = localStorage.getItem("mc_authUser");
//   const parsedAuthUser = JSON.parse(authUser);
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     const formData = new FormData();
//     formData.append("message", message);
//     formData.append("receiver", receiverId);
//     formData.append("sender", parsedAuthUser.userId);
//     if (file) {
//       formData.append("document", file); // Append the file if it exists
//     }

//     try {
//       const response = await fetch(
//         "https://localhost:7254/api/Chat/create-message",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       // Optionally reset the input fields after successful submission
//       setMessage("");
//       setFile(null);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <form className={styles.input} onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Type something..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <div className={styles.send}>
//         <label htmlFor="file">
//           <img src={Attach} alt="Attach" />
//         </label>
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <label htmlFor="file">
//           <img src={Img} alt="Send" />
//         </label>
//         <button type="submit">Send</button>
//       </div>
//     </form>
//   );
// }

// export default Input;

import React, { useState } from "react";
import styles from "./Chat.module.css";
import Img from "../../../../public/images/img.png";
import Attach from "../../../../public/images/attach.png";

function Input({ receiverId }) {
  const authUser = localStorage.getItem("mc_authUser");
  const parsedAuthUser = JSON.parse(authUser);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append("message", message);
    formData.append("receiver", receiverId);
    formData.append("sender", parsedAuthUser.userId);
    if (file) {
      formData.append("document", file); // Append the file if it exists
    }

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

      // Optionally reset the input fields after successful submission
      setMessage("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <form className={styles.input} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className={styles.send}>
        <label htmlFor="file">
          <img src={Attach} alt="Attach" />
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleFileChange}
        />
        {/* <label htmlFor="file">
          <img src={Img} alt="Send" />
        </label> */}
        <button type="submit">Send</button>
      </div>
      {/* Display selected file or image */}
      {file && (
        <div className={styles.filePreview}>
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className={styles.previewImage}
            />
          ) : (
            <p>{file.name}</p> // Show file name for non-image files
          )}
        </div>
      )}
    </form>
  );
}

export default Input;
