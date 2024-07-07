import styles from "./App.module.css";
import Header from "./components/shared-components/header/Header";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./components/shared-components/sidebar/SidebarMenu";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const storeAuthUser = useSelector((store) => store.authUser);
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    setAuthUser(storeAuthUser);
  }, [storeAuthUser]);

  return (
    <>
      <Header />
      <div className={styles.content}>
        <div className="row">
          <div className="col-2">
          {authUser && Object.keys(authUser).length > 0 && <SidebarMenu />}
          </div>
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
