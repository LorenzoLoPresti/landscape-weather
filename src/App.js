import { useEffect } from "react";

import "./App.css";
import MyNavbar from "./components/MyNavbar";
import TodayWeater from "./components/TodayWeater";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <MyNavbar />
      <TodayWeater />
    </>
  );
}

export default App;
