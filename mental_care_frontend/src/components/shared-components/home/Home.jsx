import PsycholgistAvailabilityHeading from "../../generel-users/psycholgists-availability-heading/PsycholgistAvailabilityHeading";
import PsychologistCard from "../../generel-users/psycologist-card/PsycholgistCard";
import PsycholgistSearchBox from "../../generel-users/psycholgist-search-box/PsycholgistSearchBox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { psychologistDetailsActions } from "../../../store/psychologistDetailsSlice";
import Loader from "../Loader/Loader";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologistDetails);
  useEffect(() => {
    fetch("https://localhost:7254/api/users/get-psychologists")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const psychologistData = data.result;
        dispatch(psychologistDetailsActions.addPsychologists(psychologistData));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="col-10">
        {psychologists.length > 0 && (
          <div className="p-3">
            <PsycholgistAvailabilityHeading
              psychologistNumber={psychologists.length}
            />
            <PsycholgistSearchBox />
          </div>
        )}

        <div className="ps-3">
          {psychologists.length == 0 && (
            <div className="row justify-content-center">
              <h1>No Psychologists found...</h1>
            </div>
          )}
          <div
            className="container"
            style={{
              maxHeight: "100vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="row justify-content-center">
              {psychologists.length > 0 &&
                psychologists.map(
                  (psychologist) =>
                    psychologist.isApproved === true && (
                      <div className="col-md-6 mb-3" key={psychologist.userId}>
                        <PsychologistCard psychologist={psychologist} />
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
