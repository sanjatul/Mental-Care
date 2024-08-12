import React from "react";
import Swal from "sweetalert2";
function Education({ educations, handleIsUpdated }) {
  const handleDelete = async (educationId) => {
    try {
      const response = await fetch(
        `https://localhost:7254/api/professional-details/DeleteEducation/${educationId}`,
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
          title: "Education has been removed",
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
      {educations.length > 0 ? (
        <ul className="list-unstyled">
          {educations.map((education) => (
            <li key={education.id} className="mb-2 ps-2">
              <button
                className="btn p-0 border-0 bg-transparent"
                onClick={() => handleDelete(education.educationId)}
              >
                <i className="bi bi-archive-fill"></i>
              </button>
              <span className="fs-6">
                {" "}
                {education.degree} - {education.institute} (
                {new Date(education.statingTime).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {education.endingTime
                  ? new Date(education.endingTime).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"}
                )
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <h4>No work education details available</h4>
      )}
    </div>
  );
}

export default Education;
