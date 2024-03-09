import "./Header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="p-4 sky-bg-color">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <NavLink to="" style={{ textDecoration: "none" }}>
              <h2 className="logo" style={{ paddingRight: "20px" }}>
                Mental Care
              </h2>
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink
                  to="home"
                  className={({ isActive, isPending }) =>
                    "nav-link " +
                    (isPending ? "pending" : isActive ? "active" : "")
                  }
                >
                  Home
                </NavLink>
                {/* <a href="#" className="nav-link px-2 tl">Home</a> */}
              </li>
              <li>
                <NavLink
                  to="blogs"
                  className={({ isActive, isPending }) =>
                    "nav-link " +
                    (isPending ? "pending" : isActive ? "active" : "")
                  }
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="about"
                  className={(
                    { isActive, isPending } // Corrected the path to "about" from duplicate "blogs"
                  ) =>
                    "nav-link " +
                    (isPending ? "pending" : isActive ? "active" : "")
                  }
                >
                  About Us
                </NavLink>
              </li>
            </ul>
            <div className="text-end">
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <NavLink
                    to="login"
                    className={({ isActive, isPending }) =>
                      "nav-link " +
                      (isPending ? "pending" : isActive ? "active" : "")
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="signup"
                    className={({ isActive, isPending }) =>
                      "nav-link " +
                      (isPending ? "pending" : isActive ? "active" : "")
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
