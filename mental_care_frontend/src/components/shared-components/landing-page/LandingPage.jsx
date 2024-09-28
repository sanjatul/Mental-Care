// import React from "react";
import "./LandingPage.css"; // Import your CSS file
import Psychologist from "../../../../public/images/talking with psychologist.png";
import FindPsycholgist from "../../../../public/images/find psychologist.png";
import Blogs from "../../../../public/images/blogs.jpg";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="pt-1">
      <div className="border-light-gray p-3">
        {/* Section 1 */}
        <div className="row landing-page-section pb-4">
          <div className="col-6">
            <h1 className="landing-page-heading">Mental Health Care System</h1>
            <span className="landing-page-text">
              Get both online and offline therapy and counselling. Book your
              appointment today.
            </span>
            <div className="landing-page-text">
              <p>
                Connect with a Bangladeshi-licensed therapist for support with
                depression, self-esteem, anxiety, work stress, grief and loss,
                and a variety of other topics. You can chat by text, audio, or
                video or book offline appointments from our site.
              </p>
            </div>
          </div>
          <div className="col-6">
            <img src={Psychologist} alt="Logo" className="fixed-img" />
          </div>
        </div>

        {/* Section 2 (Middle Section) */}
        <div className="row middle-section">
          <div className="col-6">
            <img
              src={FindPsycholgist}
              alt="psychologist"
              className="fixed-img"
            />
          </div>
          <div className="col-6">
            <h2 className="landing-page-heading">
              Find Qualified Psychologists
            </h2>
            <p className="landing-page-text">
              Find a number of highly qualified psychologists ready to assist
              you in your mental health journey. Take the journey with us and
              lead the fullest of your life.
            </p>
            <p className="landing-page-text">
              We have a number of psycholgists to seek help from. To find your
              desired psychologist click{" "}
              <Link className="btn btn-primary" to="/home">
                Find Psychologist
              </Link>
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="row landing-page-section">
          <div className="col-6">
            <h2 className="landing-page-heading">Read Blogs</h2>
            <p className="landing-page-text">
              Discover a wide range of blogs written by licensed psychologists,
              offering insights on mental well-being, coping strategies, and
              tips for managing stress, anxiety, and depression.
            </p>
            <p className="landing-page-text">
              These articles provide professional advice and practical tools to
              help you understand and enhance your mental health journey.{" "}
              <Link to="blogs" className="btn btn-primary">
                Read Blogs
              </Link>
            </p>
          </div>
          <div className="col-6">
            <img src={Blogs} alt="blogs" className="fixed-img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
