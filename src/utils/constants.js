// Weather images

// Day
import daysunny from "../images/daysunny.png";
import daycloudy from "../images/daycloudy.png";
import dayfog from "../images/dayfog.png";
import dayrain from "../images/dayrain.png";
import daysnow from "../images/daysnow.png";
import daystorm from "../images/daystorm.png";

// Night
import nightsunny from "../images/nightsunny.png";
import nightcloudy from "../images/nightcloudy.png";
import nightfog from "../images/nightfog.png";
import nightrain from "../images/nightrain.png";
import nightsnow from "../images/nightsnow.png";
import nightstorm from "../images/nightstorm.png";

// Weather options
export const weatherOptions = [
  { day: true, condition: "clear", url: daysunny },
  { day: true, condition: "cloudy", url: daycloudy },
  { day: true, condition: "fog", url: dayfog },
  { day: true, condition: "rain", url: dayrain },
  { day: true, condition: "snow", url: daysnow },
  { day: true, condition: "storm", url: daystorm },
  { day: false, condition: "clear", url: nightsunny },
  { day: false, condition: "cloudy", url: nightcloudy },
  { day: false, condition: "fog", url: nightfog },
  { day: false, condition: "rain", url: nightrain },
  { day: false, condition: "snow", url: nightsnow },
  { day: false, condition: "storm", url: nightstorm },
];

export const defaultWeatherOptions = {
  day: { url: daysunny },
  night: { url: nightsunny },
};

// clothing items
export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

// My location coordinates
export const coordinates = {
  latitude: 34.2695,
  longitude: -118.7815,
};

// Weather API key
export const APIkey = "386ea9a33a9f2e2f5331e09648adfa52";
