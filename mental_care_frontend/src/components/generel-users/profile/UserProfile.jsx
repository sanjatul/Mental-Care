import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
function UserProfile() {
  const storeAuthUser = useSelector((store) => store.authUser);
  const [userName, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [profilePicture, setProfilePicture] = useState(null);
  const [updatePicture, setUpdatePicture] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState(null);
  const handleProfileChange = (e) => {
    setUpdatePicture(e.target.files[0]);
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();

    const payload = {
      email: storeAuthUser.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const response = await fetch(
        `https://localhost:7254/api/auth/update-password`, // Correct the URL
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

  const handleUpdateInformationSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", storeAuthUser.userId);
    formData.append("name", userName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("age", age);
    formData.append("gender", gender);
    if (updatePicture) {
      formData.append("profilePicture", updatePicture);
    }

    try {
      const response = await fetch(
        `https://localhost:7254/api/users/update-general-user/${storeAuthUser.userId}`,
        {
          method: "PUT",
          body: formData,
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
          title: "Your profile has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setUpdatePicture(null);
        setIsUpdated(!isUpdated);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update failed!",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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

  useEffect(() => {
    const fetchPsychologistData = async () => {
      try {
        console.log("Id", storeAuthUser.userId);
        const response = await fetch(
          `https://localhost:7254/api/users/get-general-user/${storeAuthUser.userId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const result = data.result;
          console.log("data", result);
          if (data.isSuccess) {
            setName(result.name);
            setPhoneNumber(result.phoneNumber);
            setAge(result.age ? result.age.toString() : "");
            setGender(result.gender);
            setProfilePicture(result.profilePicture);
          }
        } else {
          console.error("Failed to fetch data.");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    };

    fetchPsychologistData();
  }, [storeAuthUser, isUpdated]);
  return (
    <div className="mt-5 me-5 rounded">
      <div className="row">
        <div
          className="col-12 col-md-7 border-end me-3"
          style={{ backgroundColor: "#F5F7F8", borderRadius: "10px" }}
        >
          <form className="p-2" onSubmit={handleUpdateInformationSubmit}>
            <h3 className="d-flex justify-content-center">
              <b>UPDATE INFORMATION</b>
            </h3>
            <hr />
            <div className="row">
              <div className="col-12 col-md-7">
                <div className="form-group row">
                  <div className="form-group pb-1">
                    <label>
                      <b> FULL NAME</b>
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={userName}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group pb-1">
                    <label>
                      <b> PHONE NUMBER</b>
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group pb-1">
                    <label htmlFor="age">
                      <b>AGE</b>
                    </label>
                    <select
                      className="form-select"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    >
                      <option value="">Select Age</option>
                      {ageOptions}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5 text-end">
                <img
                  src={profilePicture}
                  className="img-fluid"
                  alt="Profile"
                  style={{ maxWidth: "300px", maxHeight: "200px" }}
                />
              </div>
            </div>
            <div className="row mt-3 mb-2 pt-2">
              <div className="col-md-6">
                <label>
                  <b> GENDER:</b>
                </label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="Male"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
                    />
                    <label className="form-check-label" htmlFor="Male">
                      Male
                    </label>
                  </div>
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="Female"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                    />
                    <label className="form-check-label" htmlFor="Female">
                      Female
                    </label>
                  </div>
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="others"
                      name="gender"
                      value="others"
                      checked={gender === "others"}
                      onChange={() => setGender("others")}
                    />
                    <label className="form-check-label" htmlFor="others">
                      Others
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="profilePicture">
                  <b>UPDATE PROFILE PICTURE</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="row pt-2">
              <div className="col-4"></div>
              <div className="col-4"></div>
              <div className="col-4 text-end">
                <button className="btn btn-primary mt-4" type="submit">
                  UPDATE
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          className="col-12 col-md-4"
          style={{
            backgroundColor: "#F5F7F8",
            height: "380px",
            borderRadius: "10px",
          }}
        >
          {/* <form className="p-2" onSubmit={handleChangePassword}>
            <h3 className="d-flex justify-content-center">
              <b>CHANGE PASSWORD</b>
            </h3>
            <hr />
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <b>Old Password</b>
              </label>
              <div className="col-sm-10 mt-3">
                <input
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  placeholder="Password"
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              {passErrorMsg != null && (
                <b className="text-warning">{passErrorMsg}</b>
              )}
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <b>New Password</b>
              </label>
              <div className="col-sm-10 mt-3">
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  placeholder="Password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-1">
                Save
              </button>
            </div>
          </form> */}
          <form className="p-2" onSubmit={handleChangePassword}>
            <h3 className="d-flex justify-content-center">
              <b>CHANGE PASSWORD</b>
            </h3>
            <hr />

            {/* Old Password */}
            <div className="form-group row">
              <div className="col-sm-12">
                <label className="col-form-label">
                  <b>Old Password</b>
                </label>
              </div>
              <div className="col-sm-12 mt-1">
                <input
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  placeholder="Password"
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            <div className="form-group row">
              {passErrorMsg != null && (
                <div className="col-sm-12">
                  <b className="text-warning">{passErrorMsg}</b>
                </div>
              )}
            </div>

            {/* New Password */}
            <div className="form-group row">
              <div className="col-sm-12">
                <label className="col-form-label">
                  <b>New Password</b>
                </label>
              </div>
              <div className="col-sm-12 mt-1">
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  placeholder="Password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="form-group row">
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary mt-3">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
