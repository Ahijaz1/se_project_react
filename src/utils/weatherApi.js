import { checkResponse } from "./api.js";

export const getWeather = (coordinates, APIkey) => {
  const { latitude, longitude } = coordinates;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: data.main.temp,
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  result.type = weatherType(result.temp.F);

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const weatherType = (temperature) => {
  if (temperature > 75) {
    return "hot";
  } else if (temperature >= 60 && temperature < 75) {
    return "warm";
  } else {
    return "cold";
  }
};
