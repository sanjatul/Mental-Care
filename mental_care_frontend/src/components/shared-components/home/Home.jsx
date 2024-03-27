import PsycholgistAvailabilityHeading from "../../generel-users/psycholgists-availability-heading/PsycholgistAvailabilityHeading";
import PsychologistCard from "../../generel-users/psycologist-card/PsycholgistCard";
import PsycholgistSearchBox from "../../generel-users/psycholgist-search-box/PsycholgistSearchBox";
const Home = () => {
  return (
    <div className="container">
      <PsycholgistAvailabilityHeading />
      <PsycholgistSearchBox />
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
