import { Outlet } from "react-router-dom";
import { NavBar } from "./components";

const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
