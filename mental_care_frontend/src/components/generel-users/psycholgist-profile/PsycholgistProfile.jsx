import React from "react";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";

const PsycholgistProfile = ({ psychologist }) => {
  return (
    <div className="card" style={{ background: "#e9ecef" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-6">
                <img
                  src={psychologist.profilePicture}
                  className="card-img-top img-fluid"
                  alt="Profile"
                  style={{ maxHeight: "250px", maxWidth: "100%" }}
                />
              </div>
              <div className="col-6">
                <h1>{psychologist.name}</h1>
                <p className="">
                  {psychologist.experiences.length !== 0 &&
                    psychologist.experiences.map(
                      (experience) =>
                        experience.isDisplay === true && (
                          <React.Fragment key={experience.id}>
                            <h3 className="">{experience.designation}</h3>
                            <hr />
                            <span className="">
                              Speciality: {experience.speciality}{" "}
                            </span>
                            <br />
                          </React.Fragment>
                        )
                    )}
                  <span className="">
                    Experience: {psychologist.yearsOfExperience} years
                  </span>
                  <br />
                  <span className="">Gender: {psychologist.gender}</span>
                  <br />
                  <span className="">Age: {psychologist.age} years</span>
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="">
              <h2 className="d-flex border-0 bg-transparent px-0 f-20 pb-2 pt-3 font-weight-lg-bold font-weight-semi-bold color-gray-600">
                <MdOutlineCastForEducation
                  style={{ fontSize: "32px", marginRight: "8px" }}
                />{" "}
                Education & Training
              </h2>
              {psychologist.educations.length > 0 ? (
                <ul>
                  {psychologist.educations.map((education) => (
                    <li key={education.id}>
                      {education.degree} - {education.institute} (
                      {new Date(education.statingTime).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      -{" "}
                      {education.endingTime
                        ? new Date(education.endingTime).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
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

            <div className="">
              <h2 className="d-flex border-0 bg-transparent px-0 f-20 pb-1 pt-3 font-weight-lg-bold font-weight-semi-bold text-gray-600">
                <p style={{ display: "flex", alignItems: "center" }}>
                  <MdOutlineWork
                    style={{ fontSize: "32px", marginRight: "8px" }}
                  />
                </p>
                Work Experience
              </h2>
              {psychologist.experiences.length > 0 ? (
                <ul>
                  {psychologist.experiences.map((experience) => (
                    <li key={experience.id}>
                      {experience.designation} - {experience.workPlace} (
                      {new Date(experience.statingTime).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsycholgistProfile;
