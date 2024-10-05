// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useSelector } from "react-redux";
// function ChangePassword() {
//   const storeAuthUser = useSelector((store) => store.authUser);
//   const [newPassword, setNewPassword] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [passErrorMsg, setPassErrorMsg] = useState(null);

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     const payload = {
//       email: storeAuthUser.email,
//       oldPassword: oldPassword,
//       newPassword: newPassword,
//     };
//     try {
//       const response = await fetch(
//         `https://localhost:7254/api/auth/update-password`, // Correct the URL
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(
//           `HTTP error! Status: ${response.status}, ${errorMessage}`
//         );
//       }

//       const data = await response.json();

//       if (data.isSuccess) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Your password has been updated",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setOldPassword(""); // Clear the old password input
//         setNewPassword(""); // Clear the new password input
//         setPassErrorMsg(null); // Clear any previous error message
//       } else {
//         setPassErrorMsg("Password update failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       setPassErrorMsg("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="mt-5 me-5 rounded">
//       <div className="row">
//         <div
//           className="col-12"
//           style={{
//             backgroundColor: "#F5F7F8",
//             height: "380px",
//             borderRadius: "10px",
//           }}
//         >
//           <form className="p-2" onSubmit={handleChangePassword}>
//             <h3 className="d-flex justify-content-center">
//               <b>CHANGE PASSWORD</b>
//             </h3>
//             <hr />

//             {/* Old Password */}
//             <div className="form-group row">
//               <div className="col-sm-12">
//                 <label className="col-form-label">
//                   <b>Old Password</b>
//                 </label>
//               </div>
//               <div className="col-sm-12 mt-1">
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={oldPassword}
//                   placeholder="Password"
//                   required
//                   onChange={(e) => setOldPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Error Message */}
//             <div className="form-group row">
//               {passErrorMsg != null && (
//                 <div className="col-sm-12">
//                   <b className="text-warning">{passErrorMsg}</b>
//                 </div>
//               )}
//             </div>

//             {/* New Password */}
//             <div className="form-group row">
//               <div className="col-sm-12">
//                 <label className="col-form-label">
//                   <b>New Password</b>
//                 </label>
//               </div>
//               <div className="col-sm-12 mt-1">
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={newPassword}
//                   placeholder="Password"
//                   required
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Save Button */}
//             <div className="form-group row">
//               <div className="col-sm-12">
//                 <button type="submit" className="btn btn-primary mt-3">
//                   Save
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChangePassword;

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function ChangePassword() {
  const storeAuthUser = useSelector((store) => store.authUser);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const payload = {
      email: storeAuthUser.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await fetch(
        `https://localhost:7254/api/auth/update-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, ${errorMessage}`
        );
      }

      const data = await response.json();

      if (data.isSuccess) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your password has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setOldPassword(""); // Clear the old password input
        setNewPassword(""); // Clear the new password input
        setPassErrorMsg(null); // Clear any previous error message
      } else {
        setPassErrorMsg("Password update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setPassErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            <b>Change Password</b>
          </h3>

          <form onSubmit={handleChangePassword}>
            {/* Old Password */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                value={oldPassword}
                placeholder="Old Password"
                required
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <label htmlFor="oldPassword">
                <b>Old Password</b>
              </label>
            </div>

            {/* Error Message */}
            {passErrorMsg && (
              <div className="text-warning text-center mb-3">
                <b>{passErrorMsg}</b>
              </div>
            )}

            {/* New Password */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                placeholder="New Password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="newPassword">
                <b>New Password</b>
              </label>
            </div>

            {/* Save Button */}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
