import PsycholgistAvailabilityHeading from "../../generel-users/psycholgists-availability-heading/PsycholgistAvailabilityHeading";
import PsychologistCard from "../../generel-users/psycologist-card/PsycholgistCard";
import PsycholgistSearchBox from "../../generel-users/psycholgist-search-box/PsycholgistSearchBox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { psychologistDetailsActions } from "../../../store/psychologistDetailsSlice";
import Loader from "../Loader/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [approvedPsychologist, setApprovedPsychologist] = useState(0);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const dispatch = useDispatch();
  const psychologists = useSelector((store) => store.psychologistDetails);

  const handleSearch = (searchText) => {
    // If searchText is empty, reset the filteredPsychologists to the full list
    if (!searchText.trim()) {
      setFilteredPsychologists(psychologists);
      setApprovedPsychologist(psychologists.length);
      return;
    }

    // Convert searchText to lowercase for case-insensitive search
    const lowerCaseSearchText = searchText.toLowerCase();

    // Filter psychologists based on name or location
    const filtered = psychologists.filter((psychologist) => {
      return (
        psychologist.name.toLowerCase().includes(lowerCaseSearchText) ||
        psychologist.location?.toLowerCase().includes(lowerCaseSearchText)
      );
    });

    setFilteredPsychologists(filtered);
    setApprovedPsychologist(filtered.length);
  };

  useEffect(() => {
    fetch("https://localhost:7254/api/users/get-psychologists")
      .then((res) => res.json())
      .then((data) => {
        const psychologistData = data.result;
        const user = window.localStorage.getItem("mc_authUser");
        if (user) {
          const userDetails = JSON.parse(user);
          const userId = userDetails.userId;
          // Calculate the approved psychologists count here
          const approvedPsychologists = psychologistData.filter(
            (psychologist) =>
              psychologist.isApproved && psychologist.userId !== userId
          );
          dispatch(
            psychologistDetailsActions.addPsychologists(approvedPsychologists)
          );
          setApprovedPsychologist(approvedPsychologists.length);
          setFilteredPsychologists(approvedPsychologists); // Initialize with the full list
        } else {
          // Calculate the approved psychologists count here
          const approvedPsychologists = psychologistData.filter(
            (psychologist) => psychologist.isApproved
          );
          dispatch(
            psychologistDetailsActions.addPsychologists(approvedPsychologists)
          );
          setApprovedPsychologist(approvedPsychologists.length);
          setFilteredPsychologists(approvedPsychologists); // Initialize with the full list
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="col-10">
        {psychologists.length > 0 && (
          <div className="p-3">
            <PsycholgistAvailabilityHeading
              psychologistNumber={approvedPsychologist}
            />
            <PsycholgistSearchBox handleSearch={handleSearch} />
          </div>
        )}

        <div className="ps-3">
          {filteredPsychologists.length === 0 && (
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
              {filteredPsychologists.length > 0 &&
                filteredPsychologists.map(
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
