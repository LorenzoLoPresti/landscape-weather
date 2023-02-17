import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import placeholder from "../data/placeholder.json";
import MyCards from "./Cards";
import clear from "../img/good-wheater.jpg";
import cloudy from "../img/cloudy.jpg";
import rainy from "../img/rainy.jpg";

const TodayWeater = () => {
  const placeholderData = placeholder;
  const [wheaterData, setWheaterData] = useState(null);
  const celsiusConverter = 273;
  const citiesObj = {
    citiesLongtLat: [
      [48.85, 2.36],
      [43.73, 7.42],
      [40.41, -3.7],
      [40.71, -74.0],
    ],
  };

  const imgSwitch = (api, clear) => {
    switch (api.weather[0].main) {
      case "Clear":
        return clear;

      case "Clouds":
        return cloudy;

      case "Rain":
        return rainy;
      default:
        return cloudy;
    }
  };

  const fetchWeatherData = async () => {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=45.46&lon=09.18&appid=d6f6c690ac2b962a093aae50cf5991e5"
    );
    if (response.ok) {
      const data = await response.json();
      setWheaterData(data);
    }
  };

  useEffect(() => {
    fetchWeatherData();

    console.log("Stefano", wheaterData);
  }, []);

  useEffect(() => {
    if (wheaterData !== wheaterData) {
      fetchWeatherData();
      console.log(wheaterData.humidity);
    }
  }, [wheaterData]);

  return (
    <>
      <div
        className="width-100 height-100  mt-5 mainBg"
        style={{
          height: "700px",
          backgroundImage: `url(${
            wheaterData && imgSwitch(wheaterData, clear)
          })`,
          backgroundPosition: "right",
        }}
      >
        <Container>
          <Row className="p-5">
            <Col className="mt-5 offset-8 Col-4 text-center ">
              <h1 className="text-light fw-light" style={{ fontSize: "3rem" }}>
                {wheaterData && wheaterData.name}
              </h1>
              <h2
                className=" text-light"
                style={{ fontSize: "6rem", fontWeight: "100" }}
              >
                {wheaterData &&
                  Math.trunc(wheaterData.main.temp - celsiusConverter) + "°"}
              </h2>
              <h4
                className="text-light"
                style={{ fontSize: "2.5rem", fontWeight: "100" }}
              >
                {wheaterData && wheaterData.weather[0].main}
              </h4>
            </Col>
            <Col
              className="mt-2 py-3 px-3 offset-8 col-4 text-light dataContainer "
              style={{
                backgroundColor: "rgb (130, 129, 129)",
                border: "3px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "10px",
                boxShadow: " 0px 0px 20px 4px rgba(255, 255, 255, 0.3)",
              }}
            >
              <h4>
                Humidity:
                <p className="d-inline fw-bold text-center">
                  {" "}
                  {wheaterData && wheaterData.main.humidity}%
                </p>
              </h4>
              <h4>
                Wind deg:{" "}
                <p className="d-inline fw-bold text-center">
                  {" "}
                  {wheaterData && wheaterData.wind.deg}
                </p>
              </h4>
              <h4>
                Wind speed:
                <p className="d-inline fw-bold text-center">
                  {" "}
                  {wheaterData && wheaterData.wind.speed}
                </p>
              </h4>
              <h4>
                Visibility:
                <p className="d-inline fw-bold text-center">
                  {" "}
                  {wheaterData && wheaterData.wind.speed}
                </p>
              </h4>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#082747" }} className="p-5">
        <h3 className="text-center text-light" style={{ fontSize: "2.5rem" }}>
          Altro dal mondo
        </h3>
        <Container>
          <Row className="gx-3">
            {citiesObj.citiesLongtLat.map((coordinate) => (
              <MyCards
                long={coordinate[0]}
                lat={coordinate[1]}
                toCelsius={celsiusConverter}
                imgSwitch={imgSwitch}
              />
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};
export default TodayWeater;

// import { useEffect, useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import placeholder from "../data/placeholder.json";
// import MyCards from "./Cards";

// const fetchWeatherDataApi = async () => {
//   const response = await fetch(
//     "https://api.openweathermap.org/data/2.5/weather?lat=45.46&lon=09.18&appid=d6f6c690ac2b962a093aae50cf5991e5"
//   );
//   if (response.ok) {
//     const data = await response.json();
//     return data;
//   }
// };

// const TodayWeater = () => {
//   const placeholderData = placeholder;
//   const [wheaterData, setWheaterData] = useState(null);
//   console.log(placeholderData);
//   const arr = [1, 2, 3];

//   const fetchWeatherData = async () =>
//     setWheaterData(await fetchWeatherDataApi());

//   useEffect(() => {
//     fetchWeatherData();
//     console.log("Stefano", wheaterData);
//   }, []);

//   useEffect(() => {
//     if (wheaterData !== wheaterData) {
//       fetchWeatherData();
//     }
//   }, [wheaterData]);

//   return (
//     <>
//       <div
//         className="width-100 height-100  mt-5 mainBg"
//         style={{ height: "600px" }}
//       >
//         <Container>
//           <Row className="p-5">
//             <Col className="mt-5 offset-8 Col-4 text-center ">
//               <h1 className="text-light fw-light" style={{ fontSize: "3rem" }}>
//                 {wheaterData && wheaterData.name}
//               </h1>
//               <h2
//                 className=" text-light"
//                 style={{ fontSize: "6rem", fontWeight: "100" }}
//               >
//                 {wheaterData && wheaterData.main.temp}
//               </h2>
//               <h4
//                 className="text-light"
//                 style={{ fontSize: "2.5rem", fontWeight: "100" }}
//               >
//                 {wheaterData && wheaterData.weather[0].main}
//               </h4>
//             </Col>
//             <Col
//               className="mt-2 py-3 px-3 offset-8 Col-4 text-light dataContainer "
//               style={{
//                 backgroundColor: "rgb (130, 129, 129)",
//                 border: "3px solid rgba(255, 255, 255, 0.3)",
//                 borderRadius: "10px",
//               }}
//             >
//               <h4>
//                 <strong>Wind</strong> deg: {wheaterData && wheaterData.wind.deg}
//               </h4>
//               <h4>
//                 <strong>Wind</strong> gust:{" "}
//                 {wheaterData && wheaterData.wind.gust}
//               </h4>
//               <h4>
//                 <strong>Wind</strong> speed:{" "}
//                 {wheaterData && wheaterData.wind.speed}
//               </h4>
//               <h4 className="mt-3">
//                 Visibility: {wheaterData && wheaterData.wind.speed}
//               </h4>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       <Container>
//         <Row>
//           {arr.map((e) => (
//             <MyCards />
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// };
// export default TodayWeater;
