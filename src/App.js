import { useEffect } from "react";

import "./App.css";
// import MyNavbar from "./components/MyNavbar";
import MyTodayWeater from "./components/MyTodayWeater";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <MyTodayWeater />
    </>
  );
}

export default App;
