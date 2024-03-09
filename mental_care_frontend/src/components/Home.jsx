import PsychologistCard from "./PsycholgistCard";
import DoctorAvailabilityHeading from "./DoctorAvailabilityHeading";
import DoctorSearchBox from "./DoctorSearchBox";

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
