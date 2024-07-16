import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function PsychologistProfile() {
  const storeAuthUser = useSelector((store) => store.authUser);
  const [psychologistName, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fee, setFee] = useState(0);
  const [experience, setExperience] = useState(0);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [profilePicture, setProfilePicture] = useState(null);
  const [updatePicture, setUpdatePicture] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const handleProfileChange = (e) => {
    setUpdatePicture(e.target.files[0]);
  };

  useEffect(() => {
    const fetchPsychologistData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7254/api/users/get-psychologist/${storeAuthUser.userId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          const result = data.result[0];
          if (data.isSuccess) {
            setName(result.name);
            setLocation(result.location);
            setPhoneNumber(result.phone);
            setAge(result.age ? result.age.toString() : "");
            setFee(result.fees);
            setGender(result.gender);
            setProfilePicture(result.profilePicture);
            setExperience(
              result.yearsOfExperience ? result.yearsOfExperience.toString() : 0
            );
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

  const handleUpdateInformationSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", psychologistName);
    formData.append("number", phoneNumber);
    formData.append("location", location);
    formData.append("age", age);
    formData.append("fees", fee);
    formData.append("gender", gender);
    formData.append("experience", experience);
    if (updatePicture) {
      formData.append("profilePicture", updatePicture);
    }

    try {
      const response = await fetch(
        `https://localhost:7254/api/users/update-psychologist-user/${storeAuthUser.userId}`,
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
                      value={psychologistName}
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
                    <label>
                      <b> CURRENT CITY</b>
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
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
            <div className="row mb-2 pt-2">
              <div className="col-md-6">
                <label htmlFor="age">
                  <b> Age</b>
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
              <div className="col-md-6">
                <label>
                  <b> Gender:</b>
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
            </div>

            <div className="mb-2">
              <label htmlFor="profilePicture">
                <b>Update Profile Picture</b>
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleProfileChange}
              />
            </div>
            <div className="row pt-2">
              <div className="col-4">
                <div className="form-group pb-1">
                  <label>
                    <b>FEES (TAKA)</b>
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="form-group pb-1">
                  <label>
                    <b>YEARS OF EXPERIENCE</b>
                  </label>
                  <input
                    required
                    type="number"
                    className="form-control"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
              </div>
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
            height: "250px",
            borderRadius: "10px",
          }}
        >
          <form className="p-2">
            <h3 className="d-flex justify-content-center">
              <b>CHANGE PASSWORD</b>
            </h3>
            <hr />
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <b>New Password</b>
              </label>
              <div className="col-sm-10 mt-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <b>Confirm Password</b>
              </label>
              <div className="col-sm-10 mt-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button className="btn btn-primary mt-1">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PsychologistProfile;
