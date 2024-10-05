// import React, { useState } from "react";
// import styles from "./Signup.module.css";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("male"); // Default gender
//   const [profilePicture, setProfilePicture] = useState(null);
//   const navigate = useNavigate();
//   const handleFileChange = (e) => {
//     setProfilePicture(e.target.files[0]);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("name", name);
//     formData.append("password", password);
//     formData.append("phoneNumber", phoneNumber);
//     formData.append("age", age);
//     formData.append("gender", gender);
//     formData.append("role", "user"); // Default role
//     formData.append("file", profilePicture);

//     try {
//       const response = await fetch(
//         "https://localhost:7254/api/auth/general-register",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       if (response.ok) {
//         // Handle success, e.g., redirect to login page
//         console.log("Registration successful!");
//         const data = await response.json();
//         if (data.isSuccess == false) {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Email already exists!",
//           });
//         } else if (data.isSuccess == true) {
//           Swal.fire({
//             title: "Good job!",
//             text: "Confirm your email!",
//             icon: "success",
//           });
//           navigate("/home");
//         }
//       } else {
//         // Handle errors, display error message
//         console.error("Registration failed.");
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong!",
//         });
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong!",
//       });
//     }
//   };

//   const ageOptions = [];
//   for (let i = 15; i <= 100; i++) {
//     ageOptions.push(
//       <option key={i} value={i}>
//         {i}
//       </option>
//     );
//   }

//   return (
//     <div
//       className="login template d-flex justify-content-center align-items-center vh-100"
//       style={{ backgroundColor: "#f0f0f0" }}
//     >
//       <div
//         className={`${styles.signupForm} form_container p-5 rounded bg-white`}
//       >
//         <form onSubmit={handleSubmit}>
//           <h3 className="text-center">
//             <b>USER REGISTRATION</b>
//           </h3>
//           <div className="mb-2">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               className="form-control"
//               title="Enter a valid email address"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="fname">Name</label>
//             <input
//               type="text"
//               placeholder="Enter Full Name"
//               className="form-control"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="form-control"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="mb-2">
//             <label htmlFor="phone">Phone Number</label>
//             <input
//               type="text"
//               placeholder="Enter Phone Number"
//               className="form-control"
//               required
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           </div>
//           <div className="row mb-2">
//             <div className="col-md-6">
//               <label htmlFor="age">Age</label>
//               <select
//                 className="form-select"
//                 required
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//               >
//                 <option value="">Select Age</option>
//                 {ageOptions}
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label>Gender:</label>
//               <div className="d-flex">
//                 <div className="form-check me-3">
//                   <input
//                     type="radio"
//                     className="form-check-input"
//                     id="male"
//                     name="gender"
//                     value="male"
//                     checked={gender === "male"}
//                     onChange={() => setGender("male")}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="male">
//                     Male
//                   </label>
//                 </div>
//                 <div className="form-check me-3">
//                   <input
//                     type="radio"
//                     className="form-check-input"
//                     id="female"
//                     name="gender"
//                     value="female"
//                     checked={gender === "female"}
//                     onChange={() => setGender("female")}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="female">
//                     Female
//                   </label>
//                 </div>
//                 <div className="form-check me-3">
//                   <input
//                     type="radio"
//                     className="form-check-input"
//                     id="others"
//                     name="gender"
//                     value="others"
//                     checked={gender === "others"}
//                     onChange={() => setGender("others")}
//                     required
//                   />
//                   <label className="form-check-label" htmlFor="others">
//                     Others
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mb-2">
//             <label htmlFor="profilePicture">Select Profile Picture</label>
//             <input
//               type="file"
//               className="form-control"
//               required
//               onChange={handleFileChange}
//             />
//           </div>
//           <div className="d-grid mt-3">
//             <button
//               className="btn btn-primary"
//               style={{ backgroundColor: "#3498db" }}
//               type="submit"
//             >
//               Sign Up
//             </button>
//           </div>
//           <p className="text-end mt-2">
//             Already Registered?{" "}
//             <Link to="/login" className="ms-2">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // Default gender
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Function to validate the name and phone number
  const validateInput = () => {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only English alphabets and spaces
    const phoneRegex = /^[0-9]+$/; // Allows only digits

    if (!nameRegex.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Name should only contain English alphabets.",
      });
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number should only contain digits (0-9).",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name and phone number
    if (!validateInput()) {
      return; // Stop submission if validation fails
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("role", "user"); // Default role
    formData.append("file", profilePicture);

    try {
      const response = await fetch(
        "https://localhost:7254/api/auth/general-register",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.isSuccess === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email already exists!",
          });
        } else if (data.isSuccess === true) {
          Swal.fire({
            title: "Good job!",
            text: "Confirm your email!",
            icon: "success",
          });
          navigate("/home");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const ageOptions = [];
  for (let i = 15; i <= 100; i++) {
    ageOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div
      className="login template d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div
        className={`${styles.signupForm} form_container p-5 rounded bg-white`}
      >
        <form onSubmit={handleSubmit} className="vh-80">
          <h3 className="text-center">
            <b>USER REGISTRATION</b>
          </h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              title="Enter a valid email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="fname">Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="form-control"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Phone number and gender in the same row */}
          <div className="row mb-2">
            <div className="col-md-7">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="form-control"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label>Gender:</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    required
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    required
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="others"
                    name="gender"
                    value="others"
                    checked={gender === "others"}
                    onChange={() => setGender("others")}
                    required
                  />
                  <label className="form-check-label" htmlFor="others">
                    Others
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Age and Profile picture in the same row */}
          <div className="row mb-2">
            <div className="col-md-4">
              <label htmlFor="age">Age</label>
              <select
                className="form-select"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Select Age</option>
                {ageOptions}
              </select>
            </div>
            <div className="col-md-8">
              <label htmlFor="profilePicture">Select Profile Picture</label>
              <input
                type="file"
                className="form-control"
                required
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="d-grid mt-3">
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#3498db" }}
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <p className="text-end mt-2">
            Already Registered?{" "}
            <Link to="/login" className="ms-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
