import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/shared-components/header/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
