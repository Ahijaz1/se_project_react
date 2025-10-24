import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "../../vendor/normalize.css";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  if (!weatherData || !weatherData.type) {
    return <p>Loading weather data...</p>;
  }

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const tempToShow = weatherData.temp?.[currentTemperatureUnit];
  const weatherType = weatherData.type.toLowerCase();

  const allItems = clothingItems || defaultClothingItems;
  const weatherFilteredItems = allItems.filter((item) => {
    // Handle case-insensitive weather matching
    const itemWeather = item.weather?.toLowerCase();
    return itemWeather === weatherType;
  });

  // If no weather-appropriate items, show default items for that weather type
  const defaultItemsForWeather = defaultClothingItems.filter(
    (item) => item.weather?.toLowerCase() === weatherType
  );

  // Prioritize default items (with working images) over database items
  const weatherAppropriateItems = [
    ...defaultItemsForWeather,
    ...weatherFilteredItems.filter(
      (item) =>
        // Only include database items that don't conflict with default item names
        !defaultItemsForWeather.some(
          (defaultItem) => defaultItem.name === item.name
        ) &&
        // And have working image URLs (not example.com)
        !item.imageUrl?.includes("example.com")
    ),
  ];

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {""}
          {currentTemperatureUnit === "F"
            ? `${weatherData.temp.F}°F`
            : `${Math.round(weatherData.temp.C)}°C`}
          {""}/ You may want to wear:
        </p>
        {weatherAppropriateItems.length > 0 ? (
          <ul className="cards__list">
            {weatherAppropriateItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        ) : (
          <p>No clothing recommendations available for this weather.</p>
        )}
      </section>
    </main>
  );
}

export default Main;
