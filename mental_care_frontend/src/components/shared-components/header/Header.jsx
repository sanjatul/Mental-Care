import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className={`${styles.skyBgColor} p-4`}>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <NavLink to="" style={{ textDecoration: "none" }}>
              <h2 className={`${styles.logo}`}>Mental Care</h2>
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink
                  to="home"
                  className={({ isActive, isPending }) =>
                    `${styles.navLink} ` +
                    (isPending ? "pending" : isActive ? "active" : "")
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard`}
                  className={({ isActive, isPending }) =>
                    `${styles.navLink} ` +
                    (isPending ? "pending" : isActive ? "active" : "")
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="blogs"
                  className={({ isActive, isPending }) =>
                    `${styles.navLink} ` +
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
                    `${styles.navLink} ` +
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
                      `${styles.navLink} ` +
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
                      `${styles.navLink} ` +
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
