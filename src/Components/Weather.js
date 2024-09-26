import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
const Weather = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=265947e0dea08d34acef816a0aa09920`;

  const Input = (event) => {
    setLocation(event.target.value);
  };

  const searchFunction = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="weather">
      <h1 className="header">Weather App</h1>
      <div className="search-input">
        <input
          value={location}
          onChange={Input}
          onKeyPress={searchFunction}
          type="text"
          placeholder="Enter Location...."
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp}&#176;F</h1> : null}
          </div>
          <div className="main">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="down">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}&#176;F</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind/Speed</p>
            </div>
            <div className="pressure">
              {data.main ? (
                <p className="bold">{data.main.pressure} HG</p>
              ) : null}
              <p>Pressure</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Weather;
