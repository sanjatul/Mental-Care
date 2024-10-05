import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Experience from "../experience/Experience";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import Education from "../education/Education";
function PsychologistProfile() {
  const storeAuthUser = useSelector((store) => store.authUser);
  //Psychologist basic details
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
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const handleProfileChange = (e) => {
    setUpdatePicture(e.target.files[0]);
  };
  const handleIsUpdated = () => {
    setIsUpdated(!isUpdated);
  };
  // Adding Experience
  const [designation, setDesignation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [expStartDate, setExpStartDate] = useState(null);
  const [expEndDate, setExpEndDate] = useState(null);
  const [current, setCurrent] = useState(true);

  // Adding Efucation
  const [degree, setDegree] = useState("");
  const [institute, setInstitue] = useState("");
  const [eduStartDate, setEduStartDate] = useState(null);
  const [eduEndDate, setEduEndDate] = useState(null);

  const handleAddExperience = async (e) => {
    e.preventDefault();

    const experienceData = {
      userId: storeAuthUser.userId,
      designation,
      speciality,
      workPlace,
      isDisplay: current,
      statingTime: expStartDate,
      endingTime: expEndDate,
    };
    console.log("Experience", experienceData);
    try {
      const response = await fetch(
        `https://localhost:7254/api/professional-details/CreateExperience/${storeAuthUser.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(experienceData),
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
          title: "Experience has been added",
          showConfirmButton: false,
          timer: 1500,
        });

        setDesignation("");
        setExpEndDate(null);
        setExpStartDate(null);
        setCurrent(true);
        setSpeciality("");
        setWorkPlace("");
        // Close the modal (optional)
        document.getElementById("experienceModal").classList.remove("show");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        setIsUpdated(!isUpdated);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add experience!",
        });
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();

    const educationData = {
      userId: storeAuthUser.userId,
      degree,
      institute,
      statingTime: eduStartDate,
      endingTime: eduEndDate,
    };
    try {
      const response = await fetch(
        `https://localhost:7254/api/professional-details/CreateEducation/${storeAuthUser.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(educationData),
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
          title: "Education has been added",
          showConfirmButton: false,
          timer: 1500,
        });

        setDegree("");
        setInstitue("");
        setEduStartDate(null);
        setEduEndDate(null);
        // Close the modal (optional)
        document.getElementById("educationModal").classList.remove("show");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        setIsUpdated(!isUpdated);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add education!",
        });
      }
    } catch (error) {
      console.error("Error adding education:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
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
            setExperiences(result.experiences);
            setEducations(result.educations);
          }
        } else {
          console.error("Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
    <>
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
          <div className="col-12 col-md-4">
            <div
              style={{
                backgroundColor: "#F5F7F8",
                height: "250px",
                borderRadius: "10px",
              }}
            >
              <div className="p-2">
                <div className="row">
                  <div className="col-9 pt-2">
                    <h4>
                      <b>
                        <MdOutlineWork
                          style={{ fontSize: "20px", marginRight: "8px" }}
                        />
                        Work Experience
                      </b>
                    </h4>
                  </div>
                  <div className="col-3 pt-1 text-end">
                    <div
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#experienceModal"
                    >
                      <h3>
                        <b>
                          <i class="bi bi-plus-circle"></i>
                        </b>
                      </h3>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <Experience
                experiences={experiences}
                handleIsUpdated={handleIsUpdated}
              />
            </div>
            <div
              className="mt-3"
              style={{
                backgroundColor: "#F5F7F8",
                height: "250px",
                borderRadius: "10px",
              }}
            >
              <div className="p-2">
                <div className="row">
                  <div className="col-9 pt-2">
                    <h4>
                      <b>
                        <MdOutlineCastForEducation
                          style={{ fontSize: "20px", marginRight: "8px" }}
                        />{" "}
                        Education & Training
                      </b>
                    </h4>
                  </div>
                  <div className="col-3 pt-1 text-end">
                    <div
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#educationModal"
                    >
                      <h5>
                        <b>
                          <i class="bi bi-plus-circle"></i>
                        </b>
                      </h5>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <Education
                educations={educations}
                handleIsUpdated={handleIsUpdated}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      <div
        className="modal fade"
        id="experienceModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel">
                <b>ADD EXPERIENCE</b>
              </h3>
              <div className="form-check mt-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="current"
                  checked={current}
                  onChange={(e) => setCurrent(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="current">
                  Currently Working
                </label>
              </div>
            </div>
            <form onSubmit={handleAddExperience}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="designation">
                    <b>DESIGNATION</b>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="speciality">
                    <b>SPECIALITY</b>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="workPlace">
                    <b>WORK PLACE</b>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="workPlace"
                    value={workPlace}
                    onChange={(e) => setWorkPlace(e.target.value)}
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="expStartDate">
                    <b>STARTING TIME</b>
                  </label>
                  <input
                    required
                    type="date"
                    className="form-control"
                    id="expStartDate"
                    value={expStartDate}
                    onChange={(e) => setExpStartDate(e.target.value)}
                  />
                </div>
                {!current && (
                  <div className="form-group mt-1">
                    <label htmlFor="expEndDate">
                      <b>END DATE</b>
                    </label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      id="expEndDate"
                      value={expEndDate}
                      onChange={(e) => setExpEndDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      <div
        className="modal fade"
        id="educationModal"
        tabIndex="-1"
        aria-labelledby="educationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="educationModalLabel">
                <b>ADD EDUCATION</b>
              </h3>
            </div>
            <form onSubmit={handleAddEducation}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="degree">
                    <b>DEGREE</b>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="institution">
                    <b>INSTITUTION</b>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="institution"
                    value={institute}
                    onChange={(e) => setInstitue(e.target.value)}
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="eduStartDate">
                    <b>STARTING TIME</b>
                  </label>
                  <input
                    required
                    type="date"
                    className="form-control"
                    id="eduStartDate"
                    value={eduStartDate}
                    onChange={(e) => setEduStartDate(e.target.value)}
                  />
                </div>

                <div className="form-group mt-1">
                  <label htmlFor="eduEndDate">
                    <b>END DATE</b>
                  </label>
                  <input
                    required
                    type="date"
                    className="form-control"
                    id="eduEndDate"
                    value={eduEndDate}
                    onChange={(e) => setEduEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PsychologistProfile;
