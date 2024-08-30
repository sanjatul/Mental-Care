import React, { useRef } from "react";

const PsycholgistSearchBox = ({ handleSearch }) => {
  const inputText = useRef();

  const handleSubmit = () => {
    const searchText = inputText.current.value;
    handleSearch(searchText);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(); // Call handleSubmit on pressing Enter
    }
  };

  return (
    <div className="container mt-3">
      <div className="input-group">
        <input
          ref={inputText}
          type="text"
          className="form-control"
          placeholder="Search by name or location"
          onKeyPress={handleKeyPress} // Listen for Enter key press
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
  );
};

export default PsycholgistSearchBox;
