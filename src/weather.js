import axios from "axios";
import React, { useState } from "react";
import "./weather.css";

export default function Search(props) {
  const [message, setMessage] = useState(null);
  const [city, setCity] = useState(null);

  function showWeather(response) {
    let temp = Math.round(response.data.main.temp);
    let city = response.data.name;
    let wind = response.data.wind.speed;
    let humidity = response.data.main.humidity;
    setMessage(<ul>
    <li>{city}</li>
    <li>Temperature: {temp}°C</li>
    <li>Wind: {wind}km/hr</li>
    <li>Humidity: {humidity}%</li>
    </ul>);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80b63ee33ac52921966d0561121cb9ef&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="type a city..." onChange={updateCity} />
      <input type="submit" value="search" />
    </form>
  );
  return (
    <div className="weather">
      {form}
      <h2>{message}</h2>
    </div>
  );
}