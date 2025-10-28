import "./DeleteConfirmationModal.css";
import closeIcon from "../../images/closebutton.png";

function DeleteConfirmationModal({ isOpen, onClose, onCardDelete, itemName }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal modal_opened"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-warning"
    >
      {/* Overlay to close when clicking outside the dialog */}
      <div className="delete__modal-overlay" onClick={onClose}>
        <div
          className="delete__modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="delete__modal-content">
            <button
              className="delete__modal-close"
              type="button"
              onClick={onClose}
              aria-label="Close delete confirmation modal"
            >
              <img src={closeIcon} alt="Close modal" />
            </button>

            <div className="delete__warning-container">
              <p id="delete-warning" className="delete__modal-warning">
                Are you sure you want to delete this item?
              </p>
              <p className="delete__modal-warning">
                This action is irreversible. <strong>{itemName}</strong>
              </p>
            </div>

            <div className="delete__modal-actions">
              <button
                className="modal__button delete__modal-button_cancel"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="modal__button delete__modal-button_confirm"
                type="button"
                onClick={onCardDelete}
              >
                Yes, delete item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
