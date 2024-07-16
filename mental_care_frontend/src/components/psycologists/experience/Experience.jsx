import React from "react";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
function Experience({ experiences }) {
  return (
    <div className="">
      {/* <h4 className="d-flex border-0 bg-transparent px-0 f-20 pb-1 pt-3 font-weight-lg-bold font-weight-semi-bold text-gray-600">
        <p style={{ display: "flex", alignItems: "center" }}>
          <i class="bi bi-bag-plus-fill"></i>
        </p>
        Work Experience
      </h4> */}
      {experiences.length > 0 ? (
        <ul>
          {experiences.map((experience) => (
            <li key={experience.id}>
              {experience.designation} - {experience.workPlace} (
              {new Date(experience.statingTime).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}{" "}
              -{" "}
              {experience.endingTime
                ? new Date(experience.endingTime).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Present"}
              )
            </li>
          ))}
        </ul>
      ) : (
        <h4>No work experience details available</h4>
      )}
    </div>
  );
}

export default Experience;
