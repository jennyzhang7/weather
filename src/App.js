import { useState, useEffect } from "react";
import "./App.css";
import image from "./questionmark.png";

const API_KEY = "1234";

function App() {
  const [results, setResults] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [isFahrenheit, setIsFahrenheit] = useState(true);

  useEffect(() => {
    getLocation();
  }, );

  var x = document.getElementById("demo");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log("Longitude" + longitude);
      console.log("Latitude" + latitude);

    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    console.log(position);
    setLongitude(String(position.coords.longitude));
    setLatitude(String(position.coords.latitude));
  }

  const convertToFahrenheit = (kelvinTemp) => {
    return (((kelvinTemp - 273.15) * 9) / 5 + 32).toFixed(2);
  };

  const convertToCelcius = (kelvinTemp) => {
    return (kelvinTemp - 273.15).toFixed(2);
  };

  const getTemperature = (kelvinTemp) => {
    if (isFahrenheit) {
      return convertToFahrenheit(kelvinTemp);
    } else {
      return convertToCelcius(kelvinTemp);
    }
  };

  const getMeasurement = () => {
    if (isFahrenheit) {
      return "° F";
    } else {
      return "° C";
    }
  };

  const toggleMeasurement = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const fetchWeatherData = async () => {
    console.log(results.length)
    if (latitude !== "" || longitude !== "") {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      const data = await response.json();
      console.log(data);
      const dataPoint = {
        temp: data.main.temp,
        city: data.name,
        icon: data.weather[0].icon,
      };
      setResults(dataPoint);
      console.log(results);
    }
  };
  return (
    <div className="App">
      <div id="demo">
      {(results.length === 0) && (
          <>
            <img src={image} alt="dance"></img>
            <h2>
              Click on button below to check out today's weather forecast
            </h2>
          </>
        )}
        {(results.length !== 0) && (
          <>
            <img
              src={`http://openweathermap.org/img/wn/${results.icon}@2x.png`}
              alt="Logo"
            />
            <h1>{results.city}</h1>
            <h2>
              {getTemperature(results.temp)} {getMeasurement()}
            </h2>
          </>
        )}
      </div>

      <button type="button" onClick={() => fetchWeatherData()}>
        Get Weather
      </button>

      <button type="button" onClick={() => toggleMeasurement()}>
        Celcius/Fahrenheit
      </button>
    </div>
  );
}

export default App;
