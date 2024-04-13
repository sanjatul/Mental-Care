import React, { useEffect, useState } from "react";
import { FcRating } from "react-icons/fc";
import styles from "./PsycholgistProfile.module.css";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loader from "../../shared-components/Loader/Loader";

const PsycholgistProfile = () => {
  const { userid } = useParams();
  const [psychologist, setPsyChologist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`https://localhost:7254/api/users/get-psychologist/${userid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const psychologistData = data.result;
        console.log(psychologistData[0]);
        setPsyChologist(psychologistData[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className={`${styles.doctorProfileContainer}`}>
        <div className="row">
          <div className="col-6">
            <img
              src={psychologist.profilePicture}
              className="card-img-top"
              alt="..."
            />
          </div>
          <div className="col-6">
            <h1 className={`${styles.doctorName}`}>{psychologist.name}</h1>
            <p className={styles.doctorInfo}>
              {psychologist.experiences.length != 0 &&
                psychologist.experiences.map(
                  (experience) =>
                    experience.isDisplay == true && (
                      <>
                        <h3 className={styles.designation}>
                          {experience.designation}
                        </h3>
                        <br />
                        <span className={styles.speciality}>
                          Speciality: {experience.speciality}
                        </span>
                        <br />
                      </>
                    )
                )}

              <span className={styles.experience}>
                Experience: {psychologist.yearsOfExperience} years
              </span>
              <br />
              <span className={styles.gender}>
                Gender: {psychologist.gender}
              </span>
              <br />
              <span className={styles.gender}>
                Age: {psychologist.age} years
              </span>
              <br />
              {/* <span className={styles.rating}>
                Rating: <FcRating />
                <FcRating />
                <FcRating />
              </span>
              <br /> */}
            </p>
          </div>
        </div>
      </div>
      <div className="m-4 ">
        <h2 className="d-flex border-0 bg-transparent px-0 f-20 pb-2 pt-3 font-weight-lg-bold font-weight-semi-bold text-gray-600">
          <p style={{ display: "flex", alignItems: "center" }}>
            <MdOutlineWork style={{ fontSize: "32px", marginRight: "8px" }} />
          </p>
          Work Experience
        </h2>
        {psychologist.experiences.length > 0 ? (
          <ul>
            {psychologist.experiences.map((experience) => (
              <li key={experience.id}>
                {experience.designation} - {experience.workPlace} (
                {new Date(experience.statingTime).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {experience.endingTime
                  ? new Date(experience.endingTime).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" }
                    )
                  : "Present"}
                )
              </li>
            ))}
          </ul>
        ) : (
          <h4>No work experience details available</h4>
        )}
      </div>
      <div className="m-4">
        <h2 className="d-flex  border-0 bg-transparent px-0 f-20 pb-2 pt-3 font-weight-lg-bold font-weight-semi-bold color-gray-600">
          <MdOutlineCastForEducation
            style={{ fontSize: "32px", marginRight: "8px" }}
          />{" "}
          Education &amp; Training
        </h2>
        {psychologist.educations.length > 0 ? (
          <ul>
            {psychologist.educations.map((education) => (
              <li key={education.id}>
                {education.degree} - {education.institute} (
                {new Date(education.statingTime).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {education.endingTime
                  ? new Date(education.endingTime).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" }
                    )
                  : "Present"}
                )
              </li>
            ))}
          </ul>
        ) : (
          <h4>No education details available</h4>
        )}
      </div>
    </div>
  );
};

export default PsycholgistProfile;
