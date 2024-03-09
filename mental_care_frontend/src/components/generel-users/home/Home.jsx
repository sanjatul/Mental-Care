import PsychologistCard from "../psycologist-card/PsycholgistCard";
import DoctorAvailabilityHeading from "../doctors-availability-heading/DoctorAvailabilityHeading";
import DoctorSearchBox from "../doctor-search-box/DoctorSearchBox";

const Home = () => {
  return (
    <div className="container">
      <DoctorAvailabilityHeading />
      <DoctorSearchBox />
      <div className="row ps-5">
        <div className="col-md-6">
          <PsychologistCard />
        </div>
        <div className="col-md-6">
          <PsychologistCard />
        </div>
        <div className="col-md-6">
          <PsychologistCard />
        </div>
        <div className="col-md-6">
          <PsychologistCard />
        </div>
      </div>
    </div>
  );
};
export default Home;
