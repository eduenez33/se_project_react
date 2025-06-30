import { weatherOptions } from "../../utils/constants";

import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
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
        {Math.round(weatherData.temp.F)}&deg;F
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
