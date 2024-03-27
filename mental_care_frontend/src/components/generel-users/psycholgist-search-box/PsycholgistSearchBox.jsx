import React, { useState } from "react";

const PsycholgistSearchBox = () => {
  return (
    <div className="container mt-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or location"
        />
        <button className="btn btn-primary">Search</button>
      </div>
    </div>
  );
};

export default PsycholgistSearchBox;
