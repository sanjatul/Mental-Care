import styles from "./App.module.css";
import Header from "./components/shared-components/header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/shared-components/sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        {" "}
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
