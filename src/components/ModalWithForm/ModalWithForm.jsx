import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  formValid = true,
  showSubmitButton = true,
}) {
  if (!isOpen) return null;

  return (
    <Modal name="form" onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        {children}
        {showSubmitButton && (
          <button
            type="submit"
            className={`modal__submit modal__button-shared ${formValid ? "modal__submit_enabled" : "modal__submit_disabled"}`}
            disabled={!formValid}
          >
            {buttonText}
          </button>
        )}
      </form>
    </Modal>
  );
}

export default ModalWithForm;
