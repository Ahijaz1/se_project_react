import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import closeIcon from "../../images/closebutton.png";

function ItemModal({ activeModal, onClose, card, handleDeleteItem }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!card) return null;

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner?._id === currentUser?._id;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_open" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-btn"
          id="previewclose"
        >
          <img src={closeIcon} alt="Close button" />
        </button>

        <div className="modal__image-container">
          <img
            src={card.imageUrl || card.link}
            alt={card.name}
            className="modal__image"
          />
        </div>

        <div className="modal__footer">
          <div className="modal__caption-weather">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwn && (
            <button
              type="button"
              onClick={() => handleDeleteItem(card)}
              className="modal__delete"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
