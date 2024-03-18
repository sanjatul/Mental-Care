import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mt-4">
          <div className="image-container">
            <img src="/images/1.png" alt="Your Image" className="img-fluid" />
          </div>
        </div>
        <div className="col-6 d-flex align-items-center">
          <div className="mt-7 text-center pl-4 pr-4">
            <h1
              style={{
                fontSize: "3.5rem",
                color: "#007BFF",
                fontFamily: "Times New Roman",
                marginTop: "10px", // Adjust the marginTop value
                marginLeft: "10px", // Adjust the marginLeft value
              }}
            >
              Mental Health Support Platform and Appointment Booking System
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
