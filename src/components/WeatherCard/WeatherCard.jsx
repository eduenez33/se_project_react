import { useContext } from "react";
import { weatherOptions } from "../../utils/constants";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const getWeatherCardOption = (weatherOptions) => {
    const filteredOptions = weatherOptions.filter((option) => {
      return (
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition
      );
    });
    return filteredOptions[0];
  };

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img
        src={getWeatherCardOption(weatherOptions)?.url}
        alt={`Card showing ${
          getWeatherCardOption(weatherOptions)?.day ? "day" : "night"
        }time weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
