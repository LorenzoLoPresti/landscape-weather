import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ocean from "../img/ocean.jpg";

const MyCards = ({ long, lat, toCelsius }) => {
  const [cardsData, setCardsData] = useState();
  const capitalsFetch = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d6f6c690ac2b962a093aae50cf5991e5`
    );
    if (response.ok) {
      const data = await response.json();
      setCardsData(data);
    }
  };

  useEffect(() => {
    capitalsFetch(long, lat);
  }, []);

  useEffect(() => {
    if (cardsData !== cardsData) {
      capitalsFetch(long, lat);
    }
  }, [cardsData]);

  return (
    <Col xs={3} className="my-5 px-3">
      <h3 className="text-center text-light">{cardsData && cardsData.name}</h3>
      <div
        className="p-3 bgRepeat"
        style={{
          backgroundImage: `url(${ocean})`,
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "20px",
        }}
      >
        <div
          className="my-5 p-3 px-4 text-light text-center dataContainer "
          style={{
            backgroundColor: "rgb (130, 129, 129)",
            border: "3px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
          }}
        >
          <h4>
            <strong>{cardsData && cardsData.weather[0].main}</strong>
          </h4>
          <h4>
            {cardsData && Math.trunc(cardsData.main.temp - toCelsius) + "°"}
          </h4>
          <h4>
            <strong>Wind</strong> speed:
            <p>{cardsData && cardsData.wind.speed}</p>
          </h4>
          <h4 className="mt-3">
            Visibility:
            <p> {cardsData && cardsData.visibility}</p>
          </h4>
        </div>
      </div>
    </Col>
  );
};

export default MyCards;
