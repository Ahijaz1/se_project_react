import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItemModalSubmit,
  isLoading,
  weatherData,
}) {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="additem-name" className="modal__label">
        Name{""}
        <input
          className="modal__input"
          value={values.name || ""}
          onChange={handleChange}
          type="text"
          name="name"
          id="additem-name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="additem-imageurl" className="modal__label">
        Image{""}
        <input
          className="modal__input"
          value={values.imageUrl || ""}
          onChange={handleChange}
          type="url"
          name="imageUrl"
          id="additem-imageurl"
          placeholder="Image Url"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="legend">Select the weather type:</legend>
        {weatherData && (
          <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
            Current weather is: <strong>{weatherData.type}</strong>(
            {weatherData.temp?.F}°F / {Math.round(weatherData.temp?.C)}°C)
          </p>
        )}
        <div
          className={`modal__radio-button ${values.weather === "hot" ? "modal__radio-button_selected" : ""}`}
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="weather"
            checked={values.weather === "hot"}
            value="hot"
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div
          className={`modal__radio-button ${values.weather === "warm" ? "modal__radio-button_selected" : ""}`}
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div
          className={`modal__radio-button ${values.weather === "cold" ? "modal__radio-button_selected" : ""}`}
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather"
            checked={values.weather === "cold"}
            value="cold"
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
