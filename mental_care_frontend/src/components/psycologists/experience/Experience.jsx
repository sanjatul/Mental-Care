import React from "react";
import Swal from "sweetalert2";
function Experience({ experiences, handleIsUpdated }) {
  const handleDelete = async (experienceID) => {
    try {
      const response = await fetch(
        `https://localhost:7254/api/professional-details/DeleteExperience/${experienceID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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
          title: "Work Experience has been removed",
          showConfirmButton: false,
          timer: 1500,
        });
        handleIsUpdated();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to remove education!",
        });
      }
    } catch (error) {
      console.error("Error removing education:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="">
      {experiences.length > 0 ? (
        <ul className="list-unstyled">
          {experiences.map((experience) => (
            <li key={experience.id} className="mb-2 ps-2">
              <button
                className="btn p-0 border-0 bg-transparent"
                onClick={() => handleDelete(experience.experienceId)}
              >
                <i className="bi bi-archive-fill"></i>
              </button>{" "}
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
