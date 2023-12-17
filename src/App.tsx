// WeatherComponent.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./WeatherComponent.css"; // Import the CSS file

interface WeatherData {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
  };
}

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState<string>("hyderabad");
  const api_key = "ccb7dc9eeaa71a999c4778f83e46b84a";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
        );
        const data: WeatherData = response.data;
        setWeatherData(data);
      } catch (error) {
        const typedError = error as Error;
        console.error("Error:", typedError.message);
      }
    };

    fetchData();
  }, [cityName]);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const kelvinToCelsius = (kelvin: number) => kelvin - 273.15;

  return (
    <div className="weather-container">
      <h1>Weather Information</h1>
      <form>
        <label htmlFor="cityInput">Enter City:</label>
        <input
          type="text"
          id="cityInput"
          value={cityName}
          onChange={handleCityChange}
        />
      </form>
      {weatherData ? (
        <table className="weather-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Description</th>
              <th>Temperature (°C)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cityName}</td>
              <td>{weatherData.weather[0].description}</td>
              <td>{kelvinToCelsius(weatherData.main.temp).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Failed to retrieve weather data.</p>
      )}
    </div>
  );
};

export default WeatherComponent;
