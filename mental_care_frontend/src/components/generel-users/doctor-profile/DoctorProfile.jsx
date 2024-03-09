import React from "react";
import { FcRating } from "react-icons/fc";
import styles from "./DoctorProfile.module.css";
import { MdOutlineWork } from "react-icons/md";
import { MdOutlineCastForEducation } from "react-icons/md";
import { useParams } from "react-router-dom";

const DoctorProfile = () => {
  const { userid } = useParams();
  return (
    <div className="container">
      <div className={`${styles.doctorProfileContainer}`}>
        <div className="row">
          <div className="col-6">
            <img src="/images/2.png" className="card-img-top" alt="..." />
          </div>
          <div className="col-6">
            <h5 className={`${styles.doctorName}`}>Dr. Nishan Khanna</h5>
            <p className={styles.doctorInfo}>
              <span className={styles.designation}>Senior Consultant</span>
              <br />
              <span className={styles.speciality}>Speciality: Psychiatry</span>
              <br />
              <span className={styles.experience}>Experience: 12 years</span>
              <br />
              <span className={styles.gender}>Gender: Male</span>
              <br />
              <span className={styles.rating}>
                Rating: <FcRating />
                <FcRating />
                <FcRating />
              </span>
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className="m-4 ">
        <h2 class="d-flex border-0 bg-transparent px-0 f-20 pb-2 pt-3 font-weight-lg-bold font-weight-semi-bold text-gray-600">
          <p style={{ display: "flex", alignItems: "center" }}>
            <MdOutlineWork style={{ fontSize: "32px", marginRight: "8px" }} />
          </p>
          Work Experience
        </h2>
        <ul>
          <li>
            Lead Psychologist - Serene Wellness Center (Jan 2018 - Present)
          </li>
          <li>
            Clinical Psychologist - Mindful Living Clinic (Mar 2015 - Dec 2017)
          </li>
          <li>
            Counseling Psychologist - Harmony Mental Health Institute (Jun 2012
            - Feb 2015)
          </li>
          <li>
            Psychiatric Consultant - Serenity Counseling Services (2008 - 2012)
          </li>
          <li>
            Mental Health Specialist - Tranquil Minds Clinic (2005 - 2008)
          </li>
          <li>
            Intern Psychologist - Healing Hands Psychological Services (2003 -
            2005)
          </li>
        </ul>
      </div>
      <div className="m-4">
        <h2 class="d-flex  border-0 bg-transparent px-0 f-20 pb-2 pt-3 font-weight-lg-bold font-weight-semi-bold color-gray-600">
          <MdOutlineCastForEducation
            style={{ fontSize: "32px", marginRight: "8px" }}
          />{" "}
          Education &amp; Training
        </h2>
        <div class="collapsed collapse show">
          <div className="site-content f-lg-17 color-gray-600 f-base lh-normal lh-lg-12 pb-3">
            <ul>
              <li>
                Doctor of Psychology (Psy.D.) - University of Psychology,
                Cityville (2000 - 2006)
              </li>
              <li>
                Master of Science in Clinical Psychology (M.Sc.) - City
                University, Townsville (1998 - 2000)
              </li>
              <li>
                Bachelor of Arts in Psychology (B.A.) - State College of
                Psychology, Riverside (1994 - 1998)
              </li>
              <li>
                Clinical Internship - Mental Health Institute, Cityville (2006 -
                2007)
              </li>
              <li>
                Certification in Cognitive Behavioral Therapy (CBT) - Institute
                of Behavioral Sciences (2008)
              </li>
              <li>
                Advanced Training in Mindfulness-Based Stress Reduction (MBSR) -
                Mindful Living Institute (2010)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
