import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          className="modal__input"
          value={name}
          onChange={handleNameChange}
          type="text"
          id="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="imageurl" className="modal__label">
        Image{""}
        <input
          className="modal__input"
          value={imageUrl}
          onChange={handleImageUrlChange}
          type="url"
          id="imageurl"
          placeholder="Image Url"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="legend">Select the weather type:</legend>
        <div
          className={`modal__radio-button ${weather === "hot" ? "modal__radio-button_selected" : ""}`}
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="weather"
            checked={weather === "hot"}
            value="hot"
            onChange={handleWeatherChange}
          />
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div
          className={`modal__radio-button ${weather === "warm" ? "modal__radio-button_selected" : ""}`}
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather"
            checked={weather === "warm"}
            value="warm"
            onChange={handleWeatherChange}
          />
          <label className="modal__radio-label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div
          className={`modal__radio-button ${weather === "cold" ? "modal__radio-button_selected" : ""}`}
        >
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather"
            checked={weather === "cold"}
            value="cold"
            onChange={handleWeatherChange}
          />
          <label className="modal__radio-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
