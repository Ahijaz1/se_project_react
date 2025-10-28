import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { Modal } from "../Modal/Modal";

function ItemModal({ activeModal, onClose, card, handleDeleteItem }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!card || activeModal !== "preview") return null;

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner?._id === currentUser?._id;

  return (
    <Modal name="image" onClose={onClose}>
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
    </Modal>
  );
}

export default ItemModal;
