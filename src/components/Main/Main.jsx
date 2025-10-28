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
  const weatherType = weatherData.type.toLowerCase();

  // Filter user items for current weather (handle both cases)
  const userWeatherItems = clothingItems.filter(
    (item) =>
      item.weather?.toLowerCase() === weatherType &&
      // Filter out test items and broken URLs
      !item.imageUrl?.includes("example.com") &&
      item.name !== "testItem" &&
      item.name?.toLowerCase() !== "testitem"
  );

  // Get default items for this weather type as fallback
  const defaultItemsForWeather = defaultClothingItems.filter(
    (item) => item.weather?.toLowerCase() === weatherType
  );

  // Combine user items first, then default items (if needed)
  const weatherAppropriateItems = [
    ...userWeatherItems, // Show user's working items first
    ...defaultItemsForWeather.filter(
      (defaultItem) =>
        // Only show default items if no user items with same name exist
        !userWeatherItems.some((userItem) => userItem.name === defaultItem.name)
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
          <div>
            <p>No clothing recommendations available for this weather.</p>
            {clothingItems.length > 0 && userWeatherItems.length === 0 && (
              <p style={{ fontSize: "14px", color: "#666" }}>
                You have {clothingItems.length} clothing item(s), but none match
                the current {weatherType} weather. Try adding items for{" "}
                {weatherType} weather or check your other items in your profile.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Main;
