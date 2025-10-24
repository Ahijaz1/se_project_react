import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { defaultWeatherOptions, weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const tempToShow = weatherData?.temp?.[currentTemperatureUnit];

  const { isDay, condition } = weatherData || {};

  const filteredOptions = weatherOptions.filter(
    (option) => option.day === isDay && option.condition === condition
  );

  const weatherOption =
    filteredOptions[0] || defaultWeatherOptions[isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {tempToShow} &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`A ${weatherOption?.condition} sky during the ${
          weatherOption?.day ? "day" : "night"
        }`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
