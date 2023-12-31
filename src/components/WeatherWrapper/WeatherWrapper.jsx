import { CurrentWeather } from "../CurrentWeather/CurrentWeather.jsx";
import { ForecastWrapper } from "../ForecastWrapper/ForecastWrapper.jsx";
import { fetchData } from "../../api.js";
import { useEffect, useState } from "react";
// import { WeatherContainer } from "./WeatherWrapper.js";
import { WeatherDetails } from "../WeatherDetails/WeatherDetails.jsx";

export const WeatherWrapper = (props) => {
  const { query } = props;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [day, setDay] = useState(0);
  const [activeDay, setActiveDay] = useState(null);

console.log(isLoading)

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      fetchData(query)
        .then(({ data }) => {
          setForecast(data.forecast.forecastday);
        })
        .catch(err=>{console.log(err)})
        .finally(setIsLoading(false)) ;
    }
  }, [query]);

  const onForecastClick = (evt) => {
    const idx = forecast.findIndex((data) => {
      return data.date === evt.currentTarget.getAttribute("date");
    })
    setDay(idx);
    setActiveDay(evt.currentTarget.getAttribute("date"))
  };

  return (
    <div className="weather-wrapper">

      <div style={{ display: "flex", flexDirection: "column" }}>
        {forecast.length > 0 ? (
          <CurrentWeather forecastday={forecast[day]} place={query} />
        ) : (
          ""
        )}
        <ForecastWrapper
          forecast={forecast}
          weekday={weekday}
          activeDay={activeDay}
          onForecastClick={onForecastClick}
        />
      </div>
      <div
        // className="CurrentWeatherDescription"
        // style={{ border: "1px solid black" }}
      >
        {forecast.length > 0 ? (
          <WeatherDetails forecastday={forecast[day]} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
