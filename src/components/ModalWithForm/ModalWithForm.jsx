import "./ModalWithForm.css";
import close from "../../images/closebutton.png";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  formValid = true,
  closeButtonClass = "modal__close",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className={closeButtonClass}>
          <img src={close} alt="Close button" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={`modal__submit ${formValid ? "modal__submit_enabled" : "modal__submit_disabled"}`}
            disabled={!formValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
