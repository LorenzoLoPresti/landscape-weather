import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyCards from "./Cards";
import clear from "../img/good-wheater.jpg";
import cloudy from "../img/cloudy.jpg";
import rainy from "../img/rainy.jpg";
import snowy from "../img/snowy.jpg";
import city from "../img/city.jpg";
import misty from "../img/misty.jpg";
import paris from "../img/paris.jpg";
import london from "../img/london.jpg";
import madrid from "../img/madrid.jpg";
import newYork from "../img/newyork.jpg";
import rome from "../img/rome.jpg";
import melbourne from "../img/melbourne.jpg";
import MySearchbar from "./MySearchbar";
// import mainReducer from "./redux/reducer";
// import { useDispatch, useSelector } from "react-redux";
// import { activeCitySelector, setActiveCityAction } from "./redux/reducer";

const TodayWeater = () => {
  // const placeholderData = placeholder;
  const [wheaterData, setWheaterData] = useState(null);
  const celsiusConverter = 273;
  const [cardIndex, setCardIndex] = useState(null);
  const citiesObj = {
    citiesLongtLat: [
      [48.85, 2.36, paris],
      [51.507351, -0.127758, london],
      [40.41, -3.7, madrid],
      [40.71, -74.0, newYork],
      [41.89, 12.49, rome],
      [28.08, -80.6, melbourne],
    ],
  };
  const [searchData, setSearchData] = useState("");
  console.log("paperino", searchData);

  // const activeCity = useSelector(activeCitySelector);
  // const dispatch = useDispatch();

  const dinamycBg = (index) => {
    return citiesObj.citiesLongtLat?.[index]?.[2];
  };

  const setIndex = (index) => {
    setCardIndex(index);
  };

  const setSearch = (search) => {
    setSearchData(search);
  };

  const imgSwitch = (api, clear) => {
    switch (api.weather[0].main) {
      case "Clear":
        return clear;

      case "Clouds":
        return cloudy;

      case "Rain":
        return rainy;

      case "Snow":
        return snowy;

      case "Mist":
        return misty;

      default:
        return cloudy;
    }
  };

  const iconSwitch = (api) => {
    switch (api.weather[0].main) {
      case "Clear":
        return "☀️";

      case "Clouds":
        return "☁️";

      case "Rain":
        return "🌧️";

      case "Snow":
        return "❄️";

      case "Mist":
        return "🌫️";

      default:
        return "🌤️";
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

  const searchFetchDynamicCities = async (city) => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=d6f6c690ac2b962a093aae50cf5991e5`
    );
    if (response.ok) {
      const data = await response.json();
      console.log("stefano ribalta la situazione", data[0].lat);
      const newResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=d6f6c690ac2b962a093aae50cf5991e5`
      );
      if (newResponse.ok) {
        const newData = await newResponse.json();
        console.log("stefano vince la guerra da solo", newData);
        setWheaterData(newData);
      }
    }
  };

  useEffect(() => {
    fetchWeatherData();

    console.log("Stefano", wheaterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    searchFetchDynamicCities(searchData);
  }, [searchData]);

  return (
    <>
      <div
        className="width-100 height-100 mainBg"
        style={{
          height: "95vh",
          backgroundImage: `url(${
            wheaterData && imgSwitch(wheaterData, clear)
          })`,
          backgroundPosition: "right",

          transition: "background-image 1s ease",
        }}
      >
        <Container>
          <Row className="p-5">
            <MySearchbar setSearch={setSearch} />
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
              <Row>
                <Col xs={7} className="pe-0">
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
                <Col className="col-4 align-self-center">
                  <p style={{ fontSize: "5rem" }}>
                    {wheaterData && iconSwitch(wheaterData)}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        style={{
          backgroundColor: "#082747",
          backgroundImage: `url(${dinamycBg(cardIndex) || city})`,
          backgroundPosition: "right",
        }}
        className="p-5 mainBg"
      >
        <Container
          style={{ backgroundColor: "rgba(8, 39, 71, 0.7)" }}
          className="pt-5"
        >
          <h3
            className="text-center text-light mb-5 mt-3"
            style={{ fontSize: "2.5rem" }}
          >
            Altro dal mondo
          </h3>
          <Row className="gx-3">
            {citiesObj.citiesLongtLat.map((coordinate, index) => (
              <MyCards
                long={coordinate[0]}
                lat={coordinate[1]}
                toCelsius={celsiusConverter}
                imgSwitch={imgSwitch}
                iconSwitch={iconSwitch}
                setIndex={setIndex}
                index={index}
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
