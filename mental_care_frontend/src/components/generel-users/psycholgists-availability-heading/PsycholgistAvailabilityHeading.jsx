import React from "react";

const PsycholgistAvailabilityHeading = ({ psychologistNumber }) => {
  return (
    <h1
      style={{
        fontSize: "2.3rem",
        color: "#007BFF",
        fontFamily: "Times New Roman",
        marginTop: "10px",
        marginLeft: "10px",
      }}
    >
      {psychologistNumber} Psychologists are available...
    </h1>
  );
};

export default PsycholgistAvailabilityHeading;
